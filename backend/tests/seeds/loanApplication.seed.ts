import { prisma } from "../../src/config/db"

export async function seedLoanApplication(
  userId: string,
  productId: string,
  tenure: number,
  overrides?: Partial<any>
) {
  return prisma.loanApplication.create({
    data: {
      loanAmount: 50000,
      status: "PENDING",
      userId,
      productId,
      tenure,
      ...overrides
    }
  })
}
