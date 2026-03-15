import db from "../db.js"
import prisma from "../prisma/client.js"

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password,
      role
    }
  })

  return user
}

export const findUserByEmail = async (email: string) => {
    const user = await prisma.users.findUnique({
    where: {
      email
    }
  })

  return user
}