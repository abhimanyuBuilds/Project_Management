import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})
import mongoose,{connect} from "mongoose"


class DataBase {
    constructor(){
        this.client = null;
        this.db = null ;
        this.isShuttingDown = false;
    }
    async connectDB(){
        if(this.client){
            return this.db
        }

        try {
            // console.log("MONGODB_URI =", process.env.MONGODB_URI);
            await mongoose.connect(process.env.MONGODB_URI,{
                connectTimeoutMS: 10000 , // 10 sec How long to wait for initial connection 
                socketTimeoutMS: 45000, // How long to wait for a response 45 sec
                serverSelectionTimeoutMS: 5000, // 5 sec how long to find a server



                //check server status every 10 sec

                heartbeatFrequencyMS: 10000,
                maxPoolSize: 10 ,          // collection pool size
                minPoolSize: 2            //minimum connections in pool
            });

            console.log("MongoDB connected successfully✅")


            // store connection instance 

            this.client = mongoose.connection.getClient()
            this.db = mongoose.connection.db;
            return this.db;
        } catch (error) {
            console.log("Connection Failed",error.message)

            if(process.env.NODE_ENV === 'developemnt'){
                console.log("Re-trying connection in 5 seconds...")
                setTimeout(() => this.connectDb(), 5000);
            }else{
                process.exit(1)
            }
            
        }
    }
}


export default new DataBase()


