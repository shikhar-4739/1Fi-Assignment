import request from "supertest"
import app from "../src/app"

import { cleanDatabase } from "./dbCleanup"
import {
  seedUser,
  seedLoanProduct,
  seedLoanApplication,
  seedCollateral
} from "./seeds"

import { getAuthToken } from "./helpers/auth.helper"

beforeEach(async () => {
  await cleanDatabase()
})


describe("Loan Approval Flow (E2E)", () => {

  it("should approve loan and auto-create loan when collateral is sufficient", async () => {

    const { token: adminToken } = await getAuthToken("ADMIN")

    const user = await seedUser({ role: "USER" })

    const product = await seedLoanProduct({
      ltv: 50,         
      interestRate: 12
    })

    const application = await seedLoanApplication(
      user.id,
      product.id,
      12,
      {
        loanAmount: 5000,
        status: "PENDING"
      }
    )

    await seedCollateral(application.id, {
      units: 100,
      nav: 1000
    })

    const res = await request(app)
      .put(`/api/loan-application/${application.id}/evaluate`)
      .set("Authorization", `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body.result.status).toBe("APPROVED")

    expect(res.body.result).toHaveProperty("loan")
    expect(res.body.result.loan).toHaveProperty("id")
    expect(res.body.result.loan.status).toBe("ACTIVE")
  })

})