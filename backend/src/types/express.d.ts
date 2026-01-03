import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        role: string
      }
      partner?: {
        id: string
        name: string
        rateLimitPerMin: number
      }
    }
  }
}