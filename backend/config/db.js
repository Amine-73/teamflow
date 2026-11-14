import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.error("error connecting to mongodb",error);
        throw error;
    }
}

export default connectDB;