import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();

// ✅ CORS configuration for Vercel frontend
const allowedOrigins = ['https://ecommerce-api-frontend.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send("API Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

export default app;
