import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/post.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import config from "./config/config.js";
import userAccountRoutes from "./routes/userAccount.routes.js";

const app = express();

app.use(express.json());
app.use('/forum', postRoutes);
app.use('/account', userAccountRoutes);
app.use(errorHandler);
const connectDB = async () => {
    try{
        await mongoose.connect(config.mongodb.uri, config.mongodb.db);
        console.log("MongoDB connected successfully.");
    }catch (err){
        console.error("MongoDB connection error:", err);
    }
}

const startServer = async () => {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}. Press Ctrl-C to finish`);
    });
}

startServer();