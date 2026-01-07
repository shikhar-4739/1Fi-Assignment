import { Router } from 'express'
import { createLoanApplicationViaPartner, createPartner, getAllPartners } from '../controllers/fintechPartner.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { authenticatePartner } from '../middleware/partnerAuth.middleware.js'
import { partnerRateLimiter } from '../middleware/partnerRateLimit.middleware.js'

const router = Router()

/**
 * @swagger
 * /api/partner/add-new:
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
 * /api/partner/loan-application:
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

/**
 * @swagger
 * /api/partner:
 *   get:
 *     summary: Get all fintech partners (Admin only)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Fintech Partner
 *     responses:
 *       200:
 *         description: Partners retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 partners:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       apiKey:
 *                         type: string
 *                       rateLimit:
 *                         type: number
 *                       isActive:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Failed to fetch partners
 */
router.get('/', authenticate, authorize('ADMIN'), getAllPartners);

export default router
