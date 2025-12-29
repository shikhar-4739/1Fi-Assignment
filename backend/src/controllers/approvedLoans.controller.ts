import type { Request, Response } from 'express'
import * as approvedLoanService  from '../service/approvedLoans.service'

export const getApprovedLoans = async (
  _req: Request,
  res: Response
) => {
  try {
    const loans = await approvedLoanService.getApprovedLoans()
    res.json(loans)
  } catch {
    res.status(500).json({ message: 'Failed to fetch approved loans' })
  }
}
