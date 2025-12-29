import { Router } from 'express'
import {
  approveLoanApplication,
  createLoanApplication,
  getAllLoanApplications,
  getMyLoanApplications
} from '../controllers/loanApplication.controller'
import { authenticate } from '../middleware/auth.middleware'
import { authorize } from '../middleware/role.middleware'

const router = Router()

router.post('/', authenticate, createLoanApplication)
router.get('/me', authenticate, getMyLoanApplications)
router.get('/all', authenticate, getAllLoanApplications)
router.put('/approve/:applicationId', authenticate, authorize('ADMIN'), approveLoanApplication)

export default router
