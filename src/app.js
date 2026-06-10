import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {createLoggerMiddleware} from "./middlewares/logger.middleware.js"
import {createLogger} from "./services/logger.service.js";




const app = express();

// =================== logger ==========================
const logger = createLogger()

//inject dependencies to middleware factory
const loggerMiddleware = createLoggerMiddleware("API", logger)

console.log("Server is started✅");
// use middleware

app.use(loggerMiddleware)

// ============= End of Logger ==========================


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true , limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// cors.configuration
app.use(
    cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:4522",
    credentials: true,
    methods: ["GET" , "POST" , "PUT" ,"PATCH" ,"DELETE" , "OPTIONS"],
    allowedHeaders: ["Content-Type" , "Authorization"] 
}))

// ============================== Routes Imports ===============================


import healthCheckRouter from "./routes/health.routes.js"
import authRouter from "./routes/auth.routes.js"
import projectRouter from "./routes/project.routes.js"


// app.post("/api/v1/auth")
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project" , projectRouter)
app.use("/api/v1/healthCheck" , healthCheckRouter);

// ============================== Routes =======================================



export default app ;