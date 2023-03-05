-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_campusId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "campusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
