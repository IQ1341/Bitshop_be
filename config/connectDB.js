import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Validasi apakah MONGODB_URI ada di .env
if (!process.env.MONGODB_URI) {
    throw new Error("❌ Konfigurasi MONGODB_URI tidak ditemukan di .env");
}

// Fungsi koneksi database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;
