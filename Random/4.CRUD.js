/*
CRUD OPERATIONS WITH HTTP METHODS

CRUD stands for Create, Read, Update, and Delete.
These are the basic operations performed on any resource in a system.
These operations are implemented in APIs using HTTP methods.


-----------------------
CREATE OPERATION
-----------------------

 POST - used to create a new resource
 Example:
 POST /users
 Body: { name: "John", email: "john@example.com" }
 Creates a new user in the database

-----------------------
READ OPERATION
-----------------------
 GET → used to fetch data
 Example 1: Get all users
 GET /users
 Example 2: Get user by ID
 GET /users/1
 Example 3: Get filtered data
 GET /users?role=admin

-----------------------
UPDATE OPERATION
-----------------------
 PUT → used for full update (replaces entire resource)
 Example:
 PUT /users/1
 Body: { name: "John Updated", email: "john_new@example.com" }
 Replaces the entire user object
 PATCH → used for partial update (updates specific fields only)
 Example:
 PATCH /users/1
 Body: { name: "John Updated" }
 Only updates the name field, keeps other data unchanged


-----------------------
DELETE OPERATION
-----------------------
 DELETE → used to remove a resource
 Example:
 DELETE /users/1
 Deletes the user with ID 1


-----------------------
SUMMARY
----------------------
 CREATE → POST
 READ   → GET
 UPDATE → PUT (full), PATCH (partial)
 DELETE → DELETE

-----------------------
IMPORTANT DIFFERENCE
-----------------------
 PUT replaces entire resource
 PATCH updates only specific fields

-----------------------
INTERVIEW ONE-LINER
-----------------------
 CRUD operations are implemented using HTTP methods:
 POST for create, GET for read,
 PUT and PATCH for update, and DELETE for removal of resources.
*/