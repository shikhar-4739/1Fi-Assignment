import { prisma } from "../../src/config/db"

export async function seedLoanProduct(overrides?: Partial<any>) {
  return prisma.loanProduct.create({
    data: {
      name: "LAMF Standard",
      interestRate: 12,
      ltv: 50,
      minAmount: 500,
      maxAmount: 500000,
      ...overrides
    }
  })
}
