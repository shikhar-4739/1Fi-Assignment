import { Router } from 'express'
import {
  addCollateral,
  getCollaterals
} from '../controllers/collateral.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

/**
 * @swagger
 * /api/collaterals:
 *   post:
 *     summary: Add collateral to loan application
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Collateral
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             loanApplicationId: "loan-application-uuid"
 *             type: "PROPERTY"
 *             value: 2000000
 *             description: "Residential property in downtown"
 *     responses:
 *       201:
 *         description: Collateral added successfully
 */
router.post('/', authenticate, addCollateral)

/**
 * @swagger
 * /api/collaterals/{loanApplicationId}:
 *   get:
 *     summary: Get collaterals for loan application
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Collateral
 *     parameters:
 *       - in: path
 *         name: loanApplicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Loan application ID
 *     responses:
 *       200:
 *         description: Collaterals retrieved successfully
 */
router.get('/:loanApplicationId', authenticate, getCollaterals)

export default router
