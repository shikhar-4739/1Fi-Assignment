import {prisma} from '../config/db'
import { ApiError } from '../utils/ApiError'

export const addCollateralToApplication = async (
  loanApplicationId: string,
  fundName: string,
  isin: string,
  units: number,
  nav: number
) => {

  const application = await prisma.loanApplication.findUnique({
    where: { id: loanApplicationId }
  })

  if (!application) {
    throw new ApiError(400, 'Loan application not found')
  }

  if (application.status !== 'PENDING') {
    throw new ApiError(400, 'Cannot add collateral to processed application')
  }

  return prisma.collateral.create({
    data: {
      loanApplicationId,
      fundName,
      isin,
      units,
      nav
    }
  })
}

export const getCollateralsByApplication = async (
  loanApplicationId: string
) => {
  return prisma.collateral.findMany({
    where: { loanApplicationId }
  })
}
