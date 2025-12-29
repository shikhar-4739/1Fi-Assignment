/*
  Warnings:

  - You are about to drop the column `loanId` on the `Collateral` table. All the data in the column will be lost.
  - Added the required column `loanApplicationId` to the `Collateral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collateral" DROP CONSTRAINT "Collateral_loanId_fkey";

-- AlterTable
ALTER TABLE "Collateral" DROP COLUMN "loanId",
ADD COLUMN     "loanApplicationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_loanApplicationId_fkey" FOREIGN KEY ("loanApplicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
