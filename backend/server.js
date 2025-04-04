import express from "express";
import connectDB from "./config/mongodb.config.js";
import cors from 'cors';
import userRouter from "./routes/user.route.js";
import connectCloudinary from "./config/cloudinary.js";
import orderRouter from "./routes/order.route.js";
import cartrouter from "./routes/cart.route.js";
import grainRouter from './routes/grain.route.js'

const app =express();

connectDB();
connectCloudinary();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

app.use('/api/grains', grainRouter);
app.use('/api/users', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/cart', cartrouter);

app.get('/', (req,res)=> {
    console.log("Backend working fine");
})

app.listen(3000, ()=>{
    console.log("app is serving on port 3000");
})