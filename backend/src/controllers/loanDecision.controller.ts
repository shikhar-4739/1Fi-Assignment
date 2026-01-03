import type { Request, Response } from 'express'
import { evaluateAndCreateLoan } from '../service/loanDecision.service'

export const evaluateLoan = async (req: Request, res: Response) => {
  try {
    const { loanApplicationId } = req.params

    if (!loanApplicationId) {
      return res.status(400).json({ message: 'Loan application ID is required' })
    }

    const result = await evaluateAndCreateLoan(loanApplicationId)

    res.json({
      message: `Loan application ${result.status}`,
      result
    })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}
