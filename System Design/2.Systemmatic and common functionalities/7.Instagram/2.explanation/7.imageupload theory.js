/*
-----------------------------------------
SINGLE FILE UPLOAD (PRESIGNED URL FLOW)
-----------------------------------------

Backend role:
- Does NOT receive the file
- Generates a presigned URL from S3
- This URL is a temporary secure permission to upload one specific file

Flow:
- User selects file in browser
- Frontend requests presigned URL from backend
- Backend returns:
  - url (temporary S3 upload link)
  - fileKey (unique identifier for the file)

Upload:
- Browser uploads file directly to S3 using HTTP PUT request
- Backend is NOT involved in actual file transfer
- This makes upload faster and scalable

Progress:
- Browser tracks upload progress using native upload events
- Used only for UI (progress bar)

Completion:
- S3 stores file permanently
- Frontend stores only fileKey in database for future access


-----------------------------------------
MULTIPART / CHUNKED UPLOAD (LARGE FILES)
-----------------------------------------

Why chunking:
- Large files (videos, big images) are split into smaller chunks
- Improves reliability, retry handling, and parallel upload speed

Flow:
- Frontend splits file into chunks (e.g., 5MB each)
- Backend initiates multipart upload session in S3
- S3 returns uploadId (represents one upload session)

Chunk upload:
- Each chunk gets its own presigned URL
- Each chunk is uploaded separately to S3 (parallel possible)
- Each uploaded chunk returns an ETag (unique fingerprint)

Tracking:
- Frontend stores:
  - PartNumber
  - ETag
- These are required to reconstruct file later

Completion:
- After all chunks are uploaded,
  backend sends uploadId + ordered parts list (ETags) to S3
- S3 merges all chunks into final file


-----------------------------------------
CORE ARCHITECTURE IDEA
-----------------------------------------

- Backend = authentication + permission generator (control plane)
- Browser = actual data uploader (data plane)
- S3 = storage + file assembler
*/

/*
-----------------------------------------
NATIVE PROGRESS EVENTS (XHR UPLOAD)
-----------------------------------------

When uploading files using XMLHttpRequest (XHR),
the browser provides built-in (native) events for tracking upload progress.

These events are NOT from React or any library — they are directly provided by the browser.

Main event used:
- xhr.upload.onprogress

What it does:
- Fires repeatedly while the file is being uploaded
- Reports how many bytes have been sent so far vs total file size

Event data:
- event.loaded → bytes uploaded so far
- event.total → total file size in bytes

Formula used:
- progress % = (loaded / total) * 100

Why it works:
- Browser streams file data to server (S3 in this case)
- While streaming, browser continuously emits progress updates

Other useful native XHR upload events:
- onloadstart → upload begins
- onload → upload completed successfully
- onerror → upload failed
- onabort → upload cancelled

Important note:
- Fetch API does NOT provide reliable upload progress events
- Only XHR supports real-time upload progress tracking in browsers

Use case in UI:
- Used to update progress bar (0% → 100%) in real time
- Purely for frontend feedback, not required for actual upload
*/
