import {prisma} from '../config/db'

export const evaluateAndCreateLoan = async (
  loanApplicationId: string
) => {
  return prisma.$transaction(async (tx) => {
    const application = await tx.loanApplication.findUnique({
      where: { id: loanApplicationId },
      include: { product: true }
    })

    if (!application) {
      throw new Error('Loan application not found')
    }

    if (application.status !== 'PENDING') {
      throw new Error('Loan application already processed')
    }

    const collaterals = await tx.collateral.findMany({
      where: { loanApplicationId }
    })

    if (collaterals.length === 0) {
      throw new Error('No collateral added')
    }

    const collateralValue = collaterals.reduce(
      (sum, c) => sum + c.units * c.nav,
      0
    )

    const eligibleAmount =
      (collateralValue * application.product.ltv) / 100

    if (application.loanAmount > eligibleAmount) {
      await tx.loanApplication.update({
        where: { id: loanApplicationId },
        data: { status: 'REJECTED' }
      })

      return {
        status: 'REJECTED',
        collateralValue,
        eligibleAmount
      }
    }

    await tx.loanApplication.update({
      where: { id: loanApplicationId },
      data: { status: 'APPROVED' }
    })

    // Check if loan already exists for this application
    const existingLoan = await tx.loan.findFirst({
      where: { loanApplicationId }
    })

    if (existingLoan) {
      throw new Error('Loan already exists for this application')
    }

    // Create the loan
    const loan = await tx.loan.create({
      data: {
        loanApplicationId: application.id,
        userId: application.userId,
        outstandingAmount: application.loanAmount,
        interestRate: application.product.interestRate,
        tenure: application.tenure,
        status: 'ACTIVE',
        partnerId: application.partnerId,
        partnerCustomerId: application.partnerCustomerId
      }
    })

    return {
      status: 'APPROVED',
      collateralValue,
      eligibleAmount,
      loan
    }
  })
}