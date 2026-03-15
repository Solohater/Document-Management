import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization
  
  if (!header) return res.status(401).json({ message: "No token" })
 
  const token = header.split(" ")[1]

  try {
    if (!token) {
    return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    ;(req as any).user = decoded

    next()
  } catch {
    res.status(401).json({ message: "Invalid token" })
  }
}