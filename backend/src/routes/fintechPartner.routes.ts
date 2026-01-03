import { Router } from 'express'
import { createLoanApplicationViaPartner, createPartner } from '../controllers/fintechPartner.controller'
import { authenticate } from '../middleware/auth.middleware'
import { authorize } from '../middleware/role.middleware'
import { authenticatePartner } from '../middleware/partnerAuth.middleware'
import { partnerRateLimiter } from '../middleware/partnerRateLimit.middleware'

const router = Router()

router.post(
  '/add-new',
  authenticate,
  authorize('ADMIN'),
  createPartner
)

router.post(
  '/loan-application',
  authenticatePartner,
  partnerRateLimiter,
  createLoanApplicationViaPartner
)

export default router
