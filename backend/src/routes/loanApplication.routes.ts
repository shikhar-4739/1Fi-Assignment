import { Router } from "express";
import {
  createLoanApplication,
  getAllLoanApplications,
  getMyLoanApplications,
} from "../controllers/loanApplication.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { evaluateLoan } from "../controllers/loanDecision.controller";

const router = Router();

/**
 * @swagger
 * /api/loan-applications:
 *   post:
 *     summary: Create loan application (User)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan Application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: "loan-product-uuid"
 *             loanAmount: 500000
 *     responses:
 *       201:
 *         description: Loan application created
 */
router.post("/", authenticate, createLoanApplication);

/**
 * @swagger
 * /api/loan-applications/me:
 *   get:
 *     summary: Get my loan applications
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan Application
 *     responses:
 *       200:
 *         description: User's loan applications retrieved successfully
 */
router.get("/me", authenticate, getMyLoanApplications);

/**
 * @swagger
 * /api/loan-applications/all:
 *   get:
 *     summary: Get all loan applications
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan Application
 *     responses:
 *       200:
 *         description: All loan applications retrieved successfully
 */
router.get("/all", authenticate, getAllLoanApplications);

/**
 * @swagger
 * /api/loan-applications/{loanApplicationId}/evaluate:
 *   put:
 *     summary: Evaluate loan application (Admin)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan Application
 *     parameters:
 *       - in: path
 *         name: loanApplicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Loan application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             decision: "APPROVED"
 *             remarks: "Application approved based on credit score"
 *     responses:
 *       200:
 *         description: Loan application evaluated successfully
 */
router.put(
  "/:loanApplicationId/evaluate",
  authenticate,
  authorize("ADMIN"),
  evaluateLoan
);

export default router;
