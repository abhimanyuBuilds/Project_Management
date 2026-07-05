import express from "express";
import cors from "cors";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import  logger  from "./services/logger.js"
import { swaggerSpec, swaggerUi } from "./swagger/swagger.js"
import helmet from "helmet";
import { apiLimiter }  from "./middlewares/rateLimit.middleware.js"

const app = express();
// ======================  Rate Limiting   ==================
app.use("/api" , apiLimiter)
// ==================End of rate limiting =============
const allowedOrigin = [
    process.env.CORS_ORIGIN,
    process.env.CORS_ORIGIN2,
    process.env.CORS_FRONTEND_ORIGIN
];

console.log("origin loaded")

app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true) // allowing request with no origin postman , curl , mobile app

            if (allowedOrigin.includes(origin)) {
                return callback(null, true)
            }
            callback(new Error(`origin ${origin} is not allowed by CORS`))
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["content-Type", "Authorization"]
    })
);



app.use(helmet());

// =================== logger ==========================


const morganFormat = ":method :url :status :response-time ms"

app.use(morgan(morganFormat,{
    stream:{
        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3]
            };
            logger.info(JSON.stringify(logObject))
        }
    }
})
);
;

// ============= End of Logger ==========================


// =================== API DOCUMENTATION ================ 

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
// ================== END OF SWAGGER MIDDLEWARE ============

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// cors.configuration

// ============================== Routes Imports ===============================


import healthCheckRouter from "./routes/health.routes.js"
import authRouter from "./routes/auth.routes.js"
import projectRouter from "./routes/project.routes.js"
import taskRouter from "./routes/task.routes.js"


// app.post("/api/v1/auth")
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/task", taskRouter)
app.use("/api/v1/healthCheck", healthCheckRouter);

// ============================== Routes =======================================



export default app;