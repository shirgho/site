# Databases

Databases. Can't live with them, can't live without them. 

Actually, you can live without them. 

Because, I've basically lived without them, or without actually using them or developing with them.

## What are they

- A database is basically made up of tables.
- A table is rows (un named) and column (named). 
- Data in column is of same type
- Tables can be joined with other tables to function as if they were that large table.
- Rows and Tables can be retrieved by queries on the joined tables.
- Retrieved data from a query can be aggregated, grouped and sorted.
- Rows can be delted, updated and inserted. 

## Some terms

Following this medium article now. Seems like a good overview:

https://medium.com/@rwilliams_bv/intro-to-databases-for-people-who-dont-know-a-whole-lot-about-them-a64ae9af712

- Query

single action taken on a database; a request in a predefined format. Kinda like an api/function call.

SELECT, INSERT, UPDATE, DELETE

e.g. SELECT ToolName FROM Wrenches

- Transaction

a sequence of queries (operations/actions) that make up a single unit of work performed against database. 

e.g. Two UPDATE operations to reduce A's balance by 20 and increase B's balance by 20.

- ACID

