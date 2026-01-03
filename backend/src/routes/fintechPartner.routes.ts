import { Router } from 'express'
import { createLoanApplicationViaPartner, createPartner } from '../controllers/fintechPartner.controller'
import { authenticate } from '../middleware/auth.middleware'
import { authorize } from '../middleware/role.middleware'
import { authenticatePartner } from '../middleware/partnerAuth.middleware'
import { partnerRateLimiter } from '../middleware/partnerRateLimit.middleware'

const router = Router()

/**
 * @swagger
 * /api/partners/add-new:
 *   post:
 *     summary: Create new fintech partner (Admin)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Fintech Partner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Partner Bank Ltd"
 *             apiKey: "generated-api-key"
 *             rateLimit: 100
 *     responses:
 *       201:
 *         description: Partner created successfully
 */
router.post(
  '/add-new',
  authenticate,
  authorize('ADMIN'),
  createPartner
)

/**
 * @swagger
 * /api/partners/loan-application:
 *   post:
 *     summary: Create loan application via partner
 *     security:
 *       - apiKeyAuth: []
 *     tags:
 *       - Fintech Partner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "user-uuid"
 *             productId: "loan-product-uuid"
 *             loanAmount: 500000
 *     responses:
 *       201:
 *         description: Loan application created via partner
 */
router.post(
  '/loan-application',
  authenticatePartner,
  partnerRateLimiter,
  createLoanApplicationViaPartner
)

export default router
