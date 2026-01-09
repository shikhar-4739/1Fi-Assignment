import dotenv from 'dotenv'
import { prisma } from "../src/config/db"

dotenv.config({ path: '.env.test' })

beforeAll(async () => {                                          // Run once before all tests
  console.log("🧪 Connecting to test database...")
  await prisma.$connect()
})

afterAll(async () => {                                            // Run once after all tests
  console.log("🧹 Disconnecting Prisma...")
  await prisma.$disconnect()
})