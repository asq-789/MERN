import express from 'express';
import router from './routes/routes.mjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}
main();

// Routes
app.use('/api', router);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
