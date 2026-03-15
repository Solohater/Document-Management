import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import documentRoutes from "./routes/documentRoutes.js"

dotenv.config()

const app = express()

app.use(cors()) // Allow requests from other origins
app.use(express.json()) //This middleware allows the server to read JSON data from requests.

app.use("/uploads", express.static("uploads")) //This exposes a folder publicly.It means:files in /uploads folder can be accessed via URL
// Routes
app.use("/api/auth", authRoutes)
app.use("/api/documents", documentRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})