import type { Request, Response } from 'express'
import * as loanApplicationService from '../service/loanApplication.service'

export const createLoanApplication = async (req: Request, res: Response) => {
  try {
    const { productId, loanAmount, tenure } = req.body
    const applicantId = req.user!.userId

    if(!productId || !loanAmount || !tenure) {
      return  res.status(400).json({ message: 'Product ID, loan amount, and tenure are required' })
    }

    const application =
      await loanApplicationService.createLoanApplication(
        applicantId,
        productId,
        loanAmount,
        tenure
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

// export const approveLoanApplication = async (req: Request, res: Response) => {
//   try {
//     const { applicationId } = req.params
    
//     if (!applicationId) {
//       return res.status(400).json({ message: 'Application ID is required' })
//     }

//     const result = await loanApplicationService.approveLoanApplication(applicationId)
//     res.json(result)
//   } catch (err: any) {
//     res.status(400).json({ message: err.message })
//   }
// }