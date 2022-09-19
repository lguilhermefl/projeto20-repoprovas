/*
  Warnings:

  - You are about to drop the column `categoryId` on the `disciplines` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "disciplines" DROP CONSTRAINT "disciplines_categoryId_fkey";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "categoryId";
