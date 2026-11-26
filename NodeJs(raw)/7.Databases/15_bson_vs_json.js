/* 15_bson_vs_json.js

=====================================================
BSON vs JSON
=====================================================

Definition (What I should say in the interview):
- "**JSON** is a text-based, human-readable data format with only a few types - string, number,
   boolean, null, object and array. **BSON** is **Binary JSON**, the format MongoDB uses to
   store documents and send them over the wire. It is binary, so it is faster to traverse and
   parse, and it supports **extra types** like ObjectId, Date, Decimal128, Int32/Int64 and
   binary data, which plain JSON cannot represent."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature       | JSON                          | BSON                                |
|---------------|-------------------------------|-------------------------------------|
| Format        | Text (UTF-8)                  | Binary                              |
| Readability   | Human-readable                | Machine-readable                    |
| Types         | string, number, bool, null,   | + ObjectId, Date, Int32, Int64,     |
|               | object, array                 |   Double, Decimal128, Binary, Regex |
| Size          | Often smaller                 | Can be larger (length prefixes)     |
| Speed         | Must parse text               | Fast traversal (lengths stored)     |
| Used by       | REST APIs, configs            | MongoDB storage and wire protocol   |

-----------------------------------------------------
Example
-----------------------------------------------------
// In MongoDB (BSON types)
{ _id: ObjectId("6650f1c2..."), createdAt: ISODate("2026-05-24T10:00:00Z"),
  price: NumberDecimal("199.99") }

// After res.json(doc) in Express (JSON)
{ "_id": "6650f1c2...", "createdAt": "2026-05-24T10:00:00.000Z", "price": { "$numberDecimal": "199.99" } }

// Extended JSON keeps type info (used by mongoexport / EJSON)
const { EJSON } = require('bson');
EJSON.stringify({ d: new Date() });   // {"d":{"$date":"2026-..."}}

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- When data comes from an API it is JSON -> ids are strings and dates are strings. Mongoose
  casts them back to ObjectId/Date based on the schema (but aggregate() does not).
- For money use Decimal128 (or store integer paise/cents) to avoid floating point errors.
- 16MB document limit is a BSON size limit.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why didn't MongoDB just store JSON?
A1: JSON lacks types (dates, binary, precise numbers) and text parsing is slower; BSON stores
    field lengths so the server can skip fields quickly.

Q2: Is BSON always smaller than JSON?
A2: No. It can be larger due to type and length metadata; its goal is speed and types, not size.
*/
