/* 4_process_large_csv_without_crashing.js

=====================================================
Scenario: Process a 2GB CSV / 1M Records Without Running Out of Memory
=====================================================

The Question (how the interviewer asks it):
- "A user uploads a 2GB CSV file and you need to validate it and insert 1 million rows into
   the database. Your first version crashed with 'JavaScript heap out of memory'. How do you
   build it properly?"

What the interviewer is checking:
- Do you know streams and why reading the whole file into memory is wrong?
- Backpressure: do not read faster than the DB can write.
- Batching DB inserts, error handling per row, and long jobs in the background.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain the crash: fs.readFile + split('\n') loads 2GB into memory (and more as strings
   and objects). The default V8 heap is limited, so the process crashes.
2. Upload: do not buffer the upload in memory. Stream it to disk or directly to S3
   (busboy / multer disk storage / S3 multipart upload).
3. Process with streams: fs.createReadStream -> CSV parser (csv-parse) -> my processing.
   Only a small chunk is in memory at any time.
4. Respect backpressure: use `for await...of` on the parser or stream.pipeline, so the file
   is read only as fast as I can process it.
5. Batch inserts: collect 1000 rows, then do one bulk insert (insertMany / multi-row INSERT
   / COPY in Postgres). One insert per row is very slow.
6. Validate each row; collect bad rows in an error file/report instead of failing the whole job.
7. Run it as a background job (queue), return 202 + jobId, report progress (rows done).
   Make it resumable / idempotent (upsert by unique key) so a retry does not duplicate data.
8. Do NOT just increase --max-old-space-size; that only hides the real problem.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: whole file in memory
// const rows = (await fs.promises.readFile('big.csv', 'utf8')).split('\n'); // crash

// GOOD: stream + backpressure + batching
const fs = require('node:fs');
const { parse } = require('csv-parse');

async function importCsv(filePath, db) {
  const parser = fs.createReadStream(filePath).pipe(parse({ columns: true, trim: true }));
  let batch = [];
  let total = 0, failed = 0;

  for await (const row of parser) {           // pauses reading while we await below
    if (!row.email || !row.email.includes('@')) { failed++; continue; } // validate
    batch.push({ name: row.name, email: row.email.toLowerCase() });

    if (batch.length === 1000) {
      await db.collection('users').insertMany(batch, { ordered: false });
      total += batch.length;
      batch = [];
    }
  }
  if (batch.length) {
    await db.collection('users').insertMany(batch, { ordered: false });
    total += batch.length;
  }
  return { total, failed };
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Reading a 2GB file with readFile puts everything in memory, so the heap runs out. I would
   stream the upload to disk or S3, then read it with createReadStream piped into a CSV
   parser and loop with for await, which handles backpressure automatically. I insert rows
   in batches of around 1000, collect invalid rows in an error report, and run the whole
   import as a background job with progress, so memory stays small and flat."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Increase --max-old-space-size to 8GB" as the main solution.
- Using stream.on('data') with an async DB insert inside but no pause - no backpressure,
  memory still grows.
- Inserting one row at a time (1M round trips) or the whole 1M rows in one query.
- Doing a 20-minute import inside the HTTP request.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is backpressure?
A1: When the consumer (DB writes) is slower than the producer (file reading), data piles up
    in memory. Backpressure means the producer pauses until the consumer is ready. pipeline()
    and for await...of handle this for you.

Q2: Why not use readline instead of a CSV library?
A2: readline works for simple lines, but real CSV has quoted fields with commas and newlines
    inside. A proper parser like csv-parse handles those cases.

Q3: How do you make the import safe to retry?
A3: Use upserts on a unique key (e.g. email), store progress (last processed line or job
    state), and keep the job idempotent so running it twice gives the same result.
*/
