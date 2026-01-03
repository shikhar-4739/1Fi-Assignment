import { Router } from 'express'
import { getApprovedLoans } from '../controllers/approvedLoans.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

/**
 * @swagger
 * /api/approved-loans:
 *   get:
 *     summary: Get approved loans
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Approved Loans
 *     responses:
 *       200:
 *         description: Approved loans retrieved successfully
 */
router.get(
  '/',
  authenticate,
  getApprovedLoans
)

export default router