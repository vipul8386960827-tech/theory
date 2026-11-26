/* 29_file_uploads_multer.js

=====================================================
File Uploads with Multer
=====================================================

Definition (What I should say in the interview):
- "File uploads from forms are sent as **multipart/form-data**, which express.json() and
   express.urlencoded() can't parse. **Multer** is a middleware built on busboy that parses
   that format - it puts files in **req.file** or **req.files** and text fields in req.body.
   It supports disk storage or memory storage, and I always configure file size limits and a
   file type filter. In production we usually stream or upload the file to S3 or Cloudinary
   instead of keeping it on the server's disk."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. upload.single('avatar')        -> req.file
2. upload.array('photos', 5)      -> req.files (array)
3. upload.fields([{ name: 'a' }]) -> req.files (object by field name)
4. diskStorage -> saves file; memoryStorage -> req.file.buffer (good for S3 upload).
5. Always set limits.fileSize and fileFilter.

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));   // never trust originalname as-is
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },                   // 2 MB
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg', 'image/png'].includes(file.mimetype);
    cb(ok ? null : new Error('Only JPEG/PNG allowed'), ok);
  },
});

app.post('/profile/avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(201).json({ path: req.file.path, size: req.file.size, userId: req.body.userId });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) return res.status(400).json({ message: err.message });
  res.status(400).json({ message: err.message });
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Mimetype comes from the client and can be faked; check magic bytes for sensitive cases.
- Field name in upload.single() must match the form field name, or you get "Unexpected field".
- Text fields that appear after the file in the form may not be in req.body inside fileFilter.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Disk vs memory storage?
A1: Disk is fine for local files; memory is easy for pushing to S3 but large files can exhaust RAM.

Q2: How to handle very large uploads?
A2: Stream directly to S3 (multer-s3 or busboy streams) or use pre-signed URLs so the client uploads directly.
*/
