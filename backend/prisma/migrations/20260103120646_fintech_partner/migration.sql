-- AlterTable
ALTER TABLE "Collateral" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "partnerId" TEXT;

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "partnerId" TEXT;

-- AlterTable
ALTER TABLE "LoanApplication" ADD COLUMN     "partnerId" TEXT;

-- CreateTable
CREATE TABLE "FintechPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "rateLimitPerMin" INTEGER NOT NULL DEFAULT 60,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FintechPartner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FintechPartner_apiKey_key" ON "FintechPartner"("apiKey");
