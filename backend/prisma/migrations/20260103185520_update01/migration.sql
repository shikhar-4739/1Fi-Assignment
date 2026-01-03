/*
  Warnings:

  - A unique constraint covering the columns `[partnerId,partnerCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collateral" ADD COLUMN     "partnerCustomerId" TEXT;

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "partnerCustomerId" TEXT;

-- AlterTable
ALTER TABLE "LoanApplication" ADD COLUMN     "partnerCustomerId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "partnerCustomerId" TEXT,
ALTER COLUMN "password" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_partnerId_partnerCustomerId_key" ON "User"("partnerId", "partnerCustomerId");
