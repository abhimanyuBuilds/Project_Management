import mongoose ,{Schema} from "mongoose";
import { AvailableTaskStatus , TaskStatusEnum } from "../utils/constants.js";


const taskStatusSchema = new Schema({
    title: {
        type: String , 
        required: true , 
        trim: true 
    },
    description: String , 
    project:{
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId , 
        ref: "User" , 
        required: true
    },
    status: {
        type: String , 
        enum: AvailableTaskStatus,
        default: TaskStatusEnum.TODO
    },
    attachments: {
        type: [{
            url: String , 
            mimetype: String , 
            size: Number
        }],
        default: []
    }
} , {timestamps: true})


export default mongoose.model("Task" , taskStatusSchema)