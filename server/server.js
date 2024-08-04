import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';

// Configure environment variables
dotenv.config();

// Database connection
connectDB();

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Client Request
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Routes
app.use('/api/techhaven/auth', authRoutes);
app.use('/api/techhaven/category', categoryRoutes);
app.use('/api/techhaven/product', productRoutes);
app.use('/api/techhaven/order', orderRoute);

// Default route handler
app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
});

// Define the port to run the server on
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
