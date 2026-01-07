import {prisma} from '../config/db.js'

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
          product: true,
          collaterals: true
        }
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
