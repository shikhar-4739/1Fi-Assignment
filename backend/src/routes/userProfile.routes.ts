import { Router } from 'express'
import { authenticate } from '../middleware/auth.middleware.js'
const router = Router()

import { getUserProfile } from '../controllers/userProfile.controller.js'

/**
 * @swagger
 * /api/user-profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User Profile     
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User profile not found
 *       500:
 *         description: Failed to fetch user profile
 */

router.get('/:id', authenticate, getUserProfile)                    
export default router
