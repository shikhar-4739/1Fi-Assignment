import type { Request, Response } from 'express'
import * as loanProductService from '../service/loanProduct.service.js'

export const createLoanProduct = async (req: Request, res: Response) => {
  try {
    const product = await loanProductService.createLoanProduct(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create loan product' })
  }
}

export const getLoanProducts = async (_: Request, res: Response) => {
  try {
    const products = await loanProductService.getAllLoanProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch loan products' })
  }
}
