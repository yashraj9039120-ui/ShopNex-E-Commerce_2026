import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// ====================== CORS FIX (Most Important) ======================
app.use(cors({
    origin: [
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:5173'
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(helmet());

// ====================== MIDDLEWARE ======================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(fileUpload());

// ====================== ROUTES ======================
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// ====================== ERROR HANDLER ======================
app.use(errorHandleMiddleware);

export default app;