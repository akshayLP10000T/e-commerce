import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.listen(PORT, ()=>{
    console.log(`Server listening to port ${PORT}`)
})