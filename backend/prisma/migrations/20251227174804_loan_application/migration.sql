/*
  Warnings:

  - You are about to drop the column `applicant` on the `LoanApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LoanApplication" DROP COLUMN "applicant",
ALTER COLUMN "status" SET DEFAULT 'PENDING';
