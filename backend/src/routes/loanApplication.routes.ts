import { Router } from 'express'
import {
  createLoanApplication,
  getAllLoanApplications,
  getMyLoanApplications
} from '../controllers/loanApplication.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post('/', authenticate, createLoanApplication)
router.get('/me', authenticate, getMyLoanApplications)
router.get('/all', authenticate, getAllLoanApplications)

export default router
