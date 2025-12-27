import { Router } from 'express'
import {
  createLoanProduct,
  getLoanProducts
} from '../controllers/loanProduct.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/', authenticate, createLoanProduct)
router.get('/', authenticate, getLoanProducts)

export default router