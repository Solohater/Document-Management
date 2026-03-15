import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createUser, findUserByEmail } from "../models/userModel.js"

type RegisterInput = {
  name: string
  email: string
  password: string
  role: string
}

export const registerUser = async (data: RegisterInput) => {

  const { name, email, password, role } = data

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await createUser(
    name,
    email,
    hashedPassword,
    role
  )

  return user
}

export const loginUser = async (
  email: string,
  password: string
) => {
  console.log("EMAIL RECEIVED:", email)
  const user = await findUserByEmail(email)
  console.log("USER FROM DB:",user)
  if (!user) {
    throw new Error("User not found")
  }

   if (!user.password) {
    throw new Error("Invalid user data")
  }
  const validPassword = await bcrypt.compare(
    password,
    user.password
  )
  console.log("PASSWORD MATCH:", validPassword)
  if (!validPassword) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  )

  return {
    user,
    token
  }
}