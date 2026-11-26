/* 10_orm_vs_odm.js

=====================================================
ORM vs ODM
=====================================================

Definition (What I should say in the interview):
- "An **ORM (Object Relational Mapper)** maps **tables and rows** of a relational database to
   classes and objects - examples in Node are Sequelize, TypeORM and Prisma. An **ODM (Object
   Document Mapper)** maps **documents** of a document database to objects - Mongoose is the ODM
   for MongoDB. Both give schemas, validation, relations and a nicer API instead of raw queries,
   at the cost of a bit of overhead and abstraction."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature        | ORM (Sequelize/Prisma/TypeORM) | ODM (Mongoose)              |
|----------------|--------------------------------|-----------------------------|
| Database       | SQL (Postgres, MySQL...)       | Document DB (MongoDB)       |
| Maps           | Table -> Model, row -> object  | Collection -> Model, doc -> object |
| Relations      | Associations -> SQL JOINs      | refs + populate / embedding |
| Migrations     | Essential (schema in DB)       | Rare (schema in app)        |
| Raw access     | sequelize.query / $queryRaw    | Model.collection / native driver |

-----------------------------------------------------
Example
-----------------------------------------------------
// ODM - Mongoose
const User = mongoose.model('User', new mongoose.Schema({ name: String }));
await User.find({ name: 'Vipul' });

// ORM - Sequelize
const User2 = sequelize.define('User', { name: DataTypes.STRING });
await User2.findAll({ where: { name: 'Vipul' } });

// ORM - Prisma
await prisma.user.findMany({ where: { name: 'Vipul' }, include: { posts: true } });

-----------------------------------------------------
Pros / Cons of using a mapper
-----------------------------------------------------
+ Validation, defaults, hooks, type safety (Prisma/TypeORM with TS).
+ Less boilerplate, safer against injection by default.
- Extra overhead (Mongoose hydration; use lean() for reads).
- Complex queries can be harder; you may drop to raw SQL / aggregation.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you use MongoDB without Mongoose?
A1: Yes, with the official mongodb driver. It is faster and lighter but you lose schema,
    validation, middleware and populate unless you write them yourself.

Q2: Is Prisma an ORM only for SQL?
A2: Mostly SQL, but Prisma also has a MongoDB connector.

Q3: What is a query builder?
A3: Something in between, like Knex: builds SQL with JS methods but does not map objects or
    manage relations for you.
*/
