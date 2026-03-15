import type { Request, Response } from "express"
import { registerUser, loginUser } from "../services/authServices.js"

export const register = async (req: Request, res: Response) => {
  try {
    

    const user = await registerUser(req.body)

    res.json(user)
  } catch (error) {

    res.status(400).json({ error: "Register failed" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await loginUser(email, password)

    res.json(result)
  } catch (error) {
    console.error(error)   // ADD THIS
    res.status(401).json({ error: "Login failed" })
  }
}