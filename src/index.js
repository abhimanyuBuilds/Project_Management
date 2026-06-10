import dotenv from "dotenv"
dotenv.config();
import app from "./app.js"
import DataBase from "./db/db.connection.js"


// PORT

const PORT = process.env.PORT || 4500;

// RUN SERVER


async function  startServer(){
    try {
        await DataBase.connectDB();

        app.listen(PORT , ()=>{
            console.log("✅Server is running on PORT http://localhost:4500");
            console.error(`Environment:${process.env.NODE_ENV || 'development'}`);
        })
    } catch (error) {
        console.error("Failed to start server", error.message)
        process.exit(1)
        
    }
}

startServer()