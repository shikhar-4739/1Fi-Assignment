import { getApprovedLoans } from '../controllers/approvedLoans.controller'
import { authenticate } from '../middleware/auth.middleware'

import router from './loanApplication.routes'

router.get(
  '/',
  authenticate,
  getApprovedLoans
)

export default router