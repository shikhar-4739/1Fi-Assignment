import { Router } from 'express'
import {
  addCollateral,
  getCollaterals
} from '../controllers/collateral.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post('/', authenticate, addCollateral)

router.get('/:loanApplicationId', authenticate, getCollaterals)

export default router
