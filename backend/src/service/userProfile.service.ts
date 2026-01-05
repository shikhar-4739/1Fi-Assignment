import {prisma} from '../config/db.js'

export const getUserProfileById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId }
  })
}   