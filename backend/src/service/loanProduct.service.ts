import {prisma} from '../config/db.js'

export const createLoanProduct = async (data: {
  name: string
  interestRate: number
  ltv: number
  minAmount: number
  maxAmount: number
}) => {
  return prisma.loanProduct.create({ data })
}

export const getAllLoanProducts = async () => {
  return prisma.loanProduct.findMany({
    orderBy: { createdAt: 'desc' }
  })
}
