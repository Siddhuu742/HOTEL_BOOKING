import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/Db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/UserRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB();
connectCloudinary();

const app = express()
app.use(cors()) //enable cross-origin Resource sharing


//Middleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen to clerk Webhooks 
app.use("/api/clerk", clerkWebhooks);

app.get('/',(req ,res)=>res.send("API is working"))
app.use("/api/user",userRouter)
app.use("/api/hotels", hotelRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server running on port ${PORT} - server.js:24`));