-- AlterTable
ALTER TABLE "disciplines" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
