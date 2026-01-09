import { prisma } from "../../src/config/db"

export async function seedCollateral(
  loanApplicationId: string,
  overrides?: Partial<any>
) {
  return prisma.collateral.create({
    data: {
      fundName: "HDFC Equity Fund",
      isin: "INF123456789",
      units: 100,
      nav: 1000,
      loanApplicationId,
      ...overrides
    }
  })
}
