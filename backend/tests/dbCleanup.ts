import { prisma } from "../src/config/db"

export async function cleanDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Loan",
      "LoanApplication",
      "Collateral",
      "User",
      "FintechPartner"
    RESTART IDENTITY CASCADE
  `)
}
