import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || '*' 
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // Log yang lebih ringkas
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// Port server
const PORT = process.env.PORT || 8080;

// Route utama
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});
app.use('/api/user',userRouter)
// Koneksi ke database & Jalankan server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    });
