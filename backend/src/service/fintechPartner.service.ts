import type { Prisma } from '@prisma/client'
import {prisma} from '../config/db'
import { ApiError } from '../utils/ApiError'
import { generateApiKey } from '../utils/apikey'

interface CollateralInput {
  fundName: string
  isin: string
  units: number
  nav: number
}

export const createFintechPartner = async (name: string) => {
    const checkPartner = await prisma.fintechPartner.findFirst({
        where: { name }
    })
    if (checkPartner) {
    throw new ApiError(409,'Fintech partner with this name already exists')
    }
  const apiKey = generateApiKey();

  const partner = await prisma.fintechPartner.create({
    data: {
      name,
      apiKey
    }
  })

  return partner
}


export const createLoanViaPartner = async (
  partnerId: string,
  partnerCustomerId: string,
  productId: string,
  loanAmount: number,
  collaterals: CollateralInput[]
) => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {

    let user = await tx.user.findFirst({
      where: {
        partnerId,
        partnerCustomerId
      }
    })

    if (!user) {
      user = await tx.user.create({
        data: {
          partnerId,
          partnerCustomerId,
          name: 'Partner User',
          email: `${partnerCustomerId}@partner.local`,
          password: 'NA',
          role: 'USER'
        }
      })
    }

    const product = await tx.loanProduct.findUnique({
      where: { id: productId }
    })

    if (!product) {
      throw new Error('Invalid loan product')
    }

    const application = await tx.loanApplication.create({
      data: {
        userId: user.id,
        productId,
        loanAmount,
        status: 'PENDING',
        partnerId,
        partnerCustomerId
      }
    })

    await tx.collateral.createMany({
      data: collaterals.map((c) => ({
        loanApplicationId: application.id,
        partnerId,
        fundName: c.fundName,
        isin: c.isin,
        units: c.units,
        nav: c.nav,
        partnerCustomerId
      }))
    })

    return application
  })
}


export const getAllPartnersData = async () => {
  const partners = await prisma.fintechPartner.findMany({
    select: {
      id: true,
      name: true,
      isActive: true,
      rateLimitPerMin: true,
      apiKey: true,
      createdAt: true
    }
  });
  return partners;
}