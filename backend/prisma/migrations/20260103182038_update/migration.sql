-- AlterTable
ALTER TABLE "User" ADD COLUMN     "partnerId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
