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

router.post("/", authenticate, createLoanApplication);
router.get("/me", authenticate, getMyLoanApplications);
router.get("/all", authenticate, getAllLoanApplications);
// router.put(
//   "/approve/:applicationId",
//   authenticate,
//   authorize("ADMIN"),
//   approveLoanApplication
// );
router.put(
  "/:loanApplicationId/evaluate",
  authenticate,
  authorize("ADMIN"),
  evaluateLoan
);
export default router;
