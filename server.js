import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

import authRouter from "./routes/authRoutes.js"
import donorRoutes from "./routes/donorRoutes.js"
import requestRoutes from "./routes/requestRoutes.js"

import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()

// ==============================
// DATABASE
// ==============================

connectDB()

// ==============================
// MIDDLEWARE
// ==============================

app.use(
  cors({
    origin: true,   // allow any domain
    credentials: true
  })
)

app.use(express.json())
app.use(cookieParser())

// ==============================
// ROUTES
// ==============================

app.get("/", (req, res) => {
  res.send("SERVER WORKING 🚀")
})

app.use("/api/auth", authRouter)
app.use("/api/donors", donorRoutes)
app.use("/api/requests", requestRoutes)

// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})