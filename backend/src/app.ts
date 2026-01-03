import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
const app = express()


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/health', (_, res) => {
  res.json({ status: 'OK', service: '1Fi LMS Backend' })
})

import loanProductRoutes from './routes/loanProduct.routes.js'
import authRoutes from './routes/auth.routes.js'
import loanApplicationRoutes from './routes/loanApplication.routes.js';
import approvedLoanRoutes from './routes/approvedLoans.routes.js';
import collateralRoutes from './routes/collateral.routes.js';
import fintechPartnerRoutes from './routes/fintechPartner.routes.js';

app.use('/api/loan-products', loanProductRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/loan-application', loanApplicationRoutes);
app.use('/api/approved-loans', approvedLoanRoutes);
app.use('/api/collateral', collateralRoutes);
app.use('/api/partner', fintechPartnerRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
export default app