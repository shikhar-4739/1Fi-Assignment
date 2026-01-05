import type { Request, Response } from 'express'
import { getUserProfileById } from '../service/userProfile.service.js'

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' })
    }
    const userProfile = await getUserProfileById(userId)
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' })
    }
    res.json(userProfile)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' })
  } 
}

