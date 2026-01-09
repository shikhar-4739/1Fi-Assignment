import { prisma } from "../../src/config/db"
import bcrypt from "bcrypt"

export async function seedUser(overrides?: Partial<any>) {
  const hashedPassword = await bcrypt.hash("password123", 10)

  return prisma.user.create({
    data: {
      name: "Test User",
      email: `test_${Date.now()}@test.com`,
      password: hashedPassword,
      role: "USER",
      ...overrides
    }
  })
}
