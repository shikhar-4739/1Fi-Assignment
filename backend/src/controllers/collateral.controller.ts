import type { Request, Response } from 'express'
import * as collateralService from '../service/collateral.service'

export const addCollateral = async (req: Request, res: Response) => {
  try {
    const { loanApplicationId, fundName, isin, units, nav } = req.body

    if (!loanApplicationId || !fundName || !isin || !units || !nav) {
      return res.status(400).json({
        message: 'All collateral fields are required'
      })
    }

    const collateral =
      await collateralService.addCollateralToApplication(
        loanApplicationId,
        fundName,
        isin,
        units,
        nav
      )

    res.status(201).json(collateral)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const getCollaterals = async (req: Request, res: Response) => {
  try {
    const { loanApplicationId } = req.params

    if (!loanApplicationId) {
      return res.status(400).json({
        message: 'Loan application ID is required'
      })
    }

    const collaterals =
      await collateralService.getCollateralsByApplication(
        loanApplicationId
      )

    res.json(collaterals)
  } catch {
    res.status(500).json({ message: 'Failed to fetch collaterals' })
  }
}
