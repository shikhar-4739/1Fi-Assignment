import {prisma} from '../config/db.js'

export const createLoanProduct = async (
  name: string,
  interestRate: number,
  ltv: number,
  minAmount: number,
  maxAmount: number
) => {
  return prisma.loanProduct.create({ data: { name, interestRate, ltv, minAmount, maxAmount } })
}

export const getAllLoanProducts = async () => {
  return prisma.loanProduct.findMany({
    orderBy: { createdAt: 'desc' }
  })
}


export const getLoanProductById = async (productId: string) => {
  return prisma.loanProduct.findUnique({
    where: { id: productId }
  })
}