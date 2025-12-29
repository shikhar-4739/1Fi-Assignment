import {prisma} from '../config/db'

export const getApprovedLoans = async () => {
  return prisma.loan.findMany({
    where: {
      status: 'ACTIVE'
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      loanApplication: {
        include: {
          product: true
        }
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
