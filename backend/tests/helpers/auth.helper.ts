import request from "supertest"
import app from "../../src/app"
import { seedUser } from "../seeds"

export async function getAuthToken(
  role: "USER" | "ADMIN" = "USER"
) {
  const password = "password123"

  const user = await seedUser({ role })

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: user.email,
      password
    })

  return {
    token: res.body.token,
    user
  }
}
