/*
  Warnings:

  - Added the required column `summary` to the `articles` table without a default value. This is not possible if the table is not empty.
  - The required column `name` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;
