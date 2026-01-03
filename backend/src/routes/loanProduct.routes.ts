import { Router } from 'express'
import {
  createLoanProduct,
  getLoanProducts
} from '../controllers/loanProduct.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from "../middleware/role.middleware";
const router = Router()

/**
 * @swagger
 * /api/loan-products:
 *   post:
 *     summary: Create loan product (Admin)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Personal Loan"
 *             interestRate: 12.5
 *             maxAmount: 1000000
 *             minAmount: 50000
 *             tenure: 36
 *     responses:
 *       201:
 *         description: Loan product created successfully
 */
router.post('/', authenticate, authorize("ADMIN"), createLoanProduct)

/**
 * @swagger
 * /api/loan-products:
 *   get:
 *     summary: Get all loan products
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan Product
 *     responses:
 *       200:
 *         description: Loan products retrieved successfully
 */
router.get('/', authenticate, getLoanProducts)

export default router