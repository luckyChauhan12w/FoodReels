import 'dotenv/config';
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutest from './routes/auth.routes.js';
import footItem from './routes/foodItem.routes.js';
import foodPartner from "./routes/foodPartner.routes.js"


const app = express();

const allowedOrigins =
    process.env.NODE_ENV === "development"
        ? [process.env.DEV_ORIGIN, "http://localhost:5173", "http://localhost:4173"]
        : [process.env.PROD_ORIGIN];


app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

app.use(cookieParser()); // Application level Middleware
app.use(express.json()); // Application level Middleware

app.use('/api/v1/auth', authRoutest);
app.use('/api/v1/foodItem', footItem);
app.use('/api/v1', foodPartner);


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});


export default app;
