import type { Request, Response } from 'express'
import * as loanProductService from '../service/loanProduct.service.js'

export const createLoanProduct = async (req: Request, res: Response) => {
  try {
    const {name, interestRate, minAmount, maxAmount, ltv} = req.body
    const product = await loanProductService.createLoanProduct(name, interestRate, ltv, minAmount, maxAmount)
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

export const getLoanProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' })
    }
    const product = await loanProductService.getLoanProductById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Loan product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch loan product' })
  }
}
