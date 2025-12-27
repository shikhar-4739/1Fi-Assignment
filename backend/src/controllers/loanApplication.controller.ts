import type { Request, Response } from 'express'
import * as loanApplicationService from '../service/loanApplication.service'

export const createLoanApplication = async (req: Request, res: Response) => {
  try {
    console.log('req.user:', req.body);
    const { productId, loanAmount } = req.body
    const applicantId = req.user!.userId

    if(!productId || !loanAmount) {
      return  res.status(400).json({ message: 'Product ID and loan amount are required' })
    }

    const application =
      await loanApplicationService.createLoanApplication(
        applicantId,
        productId,
        loanAmount
      )

    res.status(201).json(application)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const getMyLoanApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const applications =
      await loanApplicationService.getUserLoanApplications(userId)

    res.json(applications)
  } catch {
    res.status(500).json({ message: 'Failed to fetch applications' })
  }
}

export const getAllLoanApplications = async (req: Request, res: Response) => {
    try {
      const applications = await loanApplicationService.getAllLoanApplications()
      res.json(applications)
    } catch {
      res.status(500).json({ message: 'Failed to fetch applications' })
    }
}
