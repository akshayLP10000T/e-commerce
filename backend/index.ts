import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./database/connectDB";
import userRoute from './routes/user';
import adminRoute from './routes/admin';

dotenv.config(); // Configuration of dotenv

const PORT = process.env.PORT || 3000; // Port
const app = express();
const corsOption = { // For cors policy
    origin: 'http://localhost:5173',
    credentials: true,
}

// Default middlewares
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

// API's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

// Server listening
app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server listening to port ${PORT}`)
})