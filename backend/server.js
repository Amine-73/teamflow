import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from './routes/authRoutes.js'
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

dotenv.config();
const app=express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(helmet())
app.get("/api/health",(req,res)=>{
    res.json({"message":"Teamflow api is running "})
})


const limiter=rateLimit({
    windowMs:15*60*1000,
    limit:100,
    message:"Too many requests, please try again later."
})
app.use("/api",limiter)
app.use("/api/tasks",taskRoutes)
app.use("/api/auth",authRoutes)

app.use(errorMiddleware)


const PORT=process.env.PORT || 5000;
const serverStart=async()=>{
    
    

    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }


    
}



serverStart();



