/* 30_secure_file_upload.js

=====================================================
Scenario: Implement File Upload Safely
=====================================================

The Question (how the interviewer asks it):
- "Users need to upload a profile picture. How would you build the upload
   endpoint so it cannot be abused?"

What the interviewer is checking:
- Size and count limits (DoS protection)
- Real file type validation (not trusting the extension or Content-Type)
- Safe storage: random names, outside web root, or S3 / object storage
- Awareness of path traversal, malware and serving files safely

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: which file types and max size? Public or private files?
   How many uploads per day? Do we already use S3 or another cloud?
2. Limits: use multer with limits on fileSize, number of files and fields,
   so a huge upload cannot fill memory or disk. Also rate limit the route.
3. Validate the type: allow-list (jpeg, png, webp). The extension and the
   Content-Type header come from the client, so I also check the magic
   bytes with the file-type package. Re-encoding the image with sharp is even
   better - it removes hidden scripts and EXIF metadata (like GPS).
4. Filenames: never use originalname for storage. Generate a random name
   (crypto.randomUUID()) - this prevents path traversal like
   "../../server.js" and overwriting other files.
5. Storage: upload to S3 (or similar), not to the app server's public
   folder. For large files use presigned URLs so the client uploads
   directly to S3 and our server does not handle the bytes.
6. Serving: private files via short-lived signed URLs; set the correct
   Content-Type and X-Content-Type-Options: nosniff; for documents use
   Content-Disposition: attachment.
7. For documents (PDF, Office) scan with an antivirus like ClamAV, and keep
   the file in a "pending" state until the scan passes.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('node:crypto');
const { fileTypeFromBuffer } = require('file-type'); // ESM-only in v17+, use import() or v16

const upload = multer({
  storage: multer.memoryStorage(),           // small files only
  limits: { fileSize: 2 * 1024 * 1024, files: 1, fields: 5 },
});

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

router.post('/me/avatar', protect, upload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const type = await fileTypeFromBuffer(req.file.buffer); // check magic bytes
    if (!type || !ALLOWED.includes(type.mime)) {
      return res.status(400).json({ message: 'Only JPEG, PNG or WEBP allowed' });
    }

    // re-encode: strips metadata and anything hidden in the file
    const clean = await sharp(req.file.buffer)
      .resize(512, 512, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();

    const key = `avatars/${req.user.id}/${crypto.randomUUID()}.webp`;
    await s3.putObject({ Bucket: process.env.BUCKET, Key: key,
      Body: clean, ContentType: 'image/webp' });

    await User.updateOne({ _id: req.user.id }, { avatarKey: key });
    res.status(201).json({ key });
  } catch (err) {
    next(err);  // multer LIMIT_FILE_SIZE errors also go to the error handler
  }
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I use multer with strict limits on size and file count. I validate the
   type with an allow-list and check the magic bytes, because the extension
   and Content-Type can be faked; for images I re-encode with sharp. I never
   use the original filename - I generate a random one to avoid path
   traversal and overwrites. Files go to S3, not the public folder, and
   private files are served with signed URLs."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Checking only the extension or file.mimetype from the client.
- Saving with originalname into a public folder served by express.static.
- No size limit, or memoryStorage for big videos (memory explodes).
- Allowing SVG or HTML uploads and serving them inline (stored XSS).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How would you handle 1 GB video uploads?
A1: Presigned S3 URLs with multipart upload, so the client uploads directly
    to S3. Then an S3 event triggers a worker for validation and processing.

Q2: What is path traversal?
A2: Using "../" in a filename or path to read or write outside the intended
    folder. Fix: generate names yourself, or use path.basename and check that
    path.resolve(result) still starts with the upload directory.

Q3: Why is SVG dangerous?
A3: SVG is XML and can contain <script>. If served from your domain inline,
    it runs as XSS. Block it, sanitize it, or serve it as an attachment from
    a separate domain.
*/
