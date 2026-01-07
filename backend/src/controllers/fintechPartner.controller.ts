import type { Request, Response } from 'express'
import { createFintechPartner, createLoanViaPartner, getAllPartnersData } from '../service/fintechPartner.service.js'

export const createPartner = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Partner name required' })
    }

    const result = await createFintechPartner(name)

    res.status(201).json({
      message: 'Fintech partner created',
      partner: {
        id: result.id,
        name: result.name,
        apiKey: result.apiKey
      },
    })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const createLoanApplicationViaPartner = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId, loanAmount, partnerCustomerId, collaterals } = req.body
    const partnerId = req.partner!.id
    if (!userId || !productId || !loanAmount || !partnerCustomerId || !collaterals) {
      return res.status(400).json({ message: 'Invalid payload' })
    }

    const application = await createLoanViaPartner(
      partnerId,
      partnerCustomerId,
      productId,
      loanAmount,
      collaterals
    )

    res.status(201).json({
      message: 'Loan application created via partner',
      application
    })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const getAllPartners = async (req: Request, res: Response) => {
  try {
    const partners = await getAllPartnersData();
    res.status(200).json(partners);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};