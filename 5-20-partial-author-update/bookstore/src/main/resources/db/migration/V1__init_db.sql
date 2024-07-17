DROP SEQUENCE IF EXISTS "author_id_seq";
CREATE SEQUENCE "author_id_seq" INCREMENT BY 50 START 1;

DROP TABLE IF EXISTS "authors";
CREATE TABLE "authors" (
   "id" bigint NOT NULL,
   "age" smallint,
   "description" VARCHAR(512),
   "image" VARCHAR(512),
   "name" VARCHAR(512),
   CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "books";
CREATE TABLE "books" (
   "isbn" VARCHAR(19) NOT NULL,
   "description" VARCHAR(2048),
   "image" VARCHAR(512),
   "title" VARCHAR(512),
   "author_id" bigint,
   CONSTRAINT "books_pkey" PRIMARY KEY ("isbn")
);