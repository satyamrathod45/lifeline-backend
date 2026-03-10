import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/authRoutes.js"
import donorRoutes from "./routes/donorRoutes.js"
import requestRoutes from "./routes/requestRoutes.js"

import cookieParser from "cookie-parser"
import cors from "cors"

import http from "http"
import { Server } from "socket.io"

dotenv.config()

// Express App
const app = express()

// HTTP server (needed for socket)
const server = http.createServer(app)


// Socket Server
export const io = new Server(server,{
  cors:{
    origin:"https://satyamrathod45.github.io/",
    credentials:true
  }
})



// ==============================
// SOCKET CONNECTION
// ==============================

io.on("connection",(socket)=>{

  console.log("User connected:",socket.id)


  // Join specific request room
  socket.on("join-request",(requestId)=>{
    socket.join(requestId)
  })


  // Donor sending live location
  socket.on("donor-location",(data)=>{

    const { requestId , lat , lng } = data

    io.to(requestId).emit("location-update",{
      lat,
      lng
    })

  })


  socket.on("disconnect",()=>{
    console.log("User disconnected:",socket.id)
  })

})



// ==============================
// DATABASE
// ==============================

connectDB()



// ==============================
// MIDDLEWARE
// ==============================

app.use(
  cors()
)

app.use(express.json())
app.use(cookieParser())



// ==============================
// ROUTES
// ==============================

app.get("/",(req,res)=>{
  res.send("SERVER WORKING")
})

app.use("/api/auth",authRouter)
app.use("/api/donors",donorRoutes)
app.use("/api/requests",requestRoutes)



// ==============================
// SERVER LISTEN
// ==============================

const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})