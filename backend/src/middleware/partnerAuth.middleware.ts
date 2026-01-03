import type{ Request, Response, NextFunction } from 'express'
import {prisma} from '../config/db'

export const authenticatePartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'] as string

  if (!apiKey) {
    return res.status(401).json({ message: 'API key missing' })
  }

  const partner = await prisma.fintechPartner.findUnique({
    where: { apiKey }
  })

  if (!partner || !partner.isActive) {
    return res.status(403).json({ message: 'Invalid API key' })
  }

  req.partner = partner
  next()
}
