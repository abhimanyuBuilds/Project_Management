import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import Task from "../models/task.model.js"
import SubTask from "../models/subtask.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async-handler.js"
import mongoose from "mongoose"
import Project from "../models/project.model.js"
import ProjectMember from "../models/projectmember.model.js"



const getTask = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const project = await Project.findById(projectId)


    if (!project) {
        throw new ApiError(404, "Project not found")
    };


    const tasks = await Task.find({
        project: new mongoose.Types.ObjectId(projectId)
    }).populate("assignedTo", "avatar username FullName");

    return res
        .status(200)
        .json(new ApiResponse(200, tasks, "Task fetched successfully"))

});

const createtask = asyncHandler(async (req, res) => {
    const { title, description, assignedTo, status } = req.body
    const { projectId } = req.params

    const project = await Project.findById(projectId)


    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    const files = req.files || []

    const attachments = files.map((file) => {
        return {
            url: ` ${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype: file.mimetype,
            size: file.size
        }
    });


    const task = await Task.create({
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: assignedTo
            ? new mongoose.Types.ObjectId(assignedTo) :
            undefined,
        status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments

    });

    return res
        .status(201)
        .json(new ApiResponse(201, task, " Task Created Successfully "))

});

const getTaskDetail = asyncHandler(async (req, res) => {
    const { taskId } = req.params

    const task = await Task.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(taskId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo",
                pipeline: [{
                    User: "users"
                }
                ]
            }
        }
    ])


});

const updateTask = asyncHandler(async (req, res) => {
    const { title, description, project, assignedTo, status } = req.body
    const { taskId } = req.params


    const task = await Task.findByIdAndUpdate(
        taskId,
        {
            title,
            description,
            project,
            assignedTo,
            status
        },
        { new: true }
    );

    if (!task) {
        throw new ApiError(404, "Task not found")
    };

    return res
        .status(200)
        .json(new ApiResponse(200, task, "Task Updated Successfully"))




});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params

    const task = await Task.findByIdAndDelete(
        taskId
    )

    if (!task) {
        throw new ApiError(404, "Task not found")
    };

    return res
        .status(204)
        .json(new ApiResponse(204, null ,"Deleted task successfully"))
});

//Create subtask
const createSubTask = asyncHandler(async (req, res) => {
    const { title, isCompleted } = req.body
    const { taskId } = req.params

    const task = await Task.findById(
        taskId
    );

    if (!task) {
        throw new ApiError(404, "Task not found")
    };

    const subTask = await SubTask.create({
        title,
        task: new mongoose.Types.ObjectId(taskId),
        isCompleted,
        createdBy: new mongoose.Types.ObjectId(req.user._id)

    });

    return res
        .status(201)
        .json(new ApiResponse(201, subTask, "SubTask created successfully"))
});


const updateSubTask = asyncHandler(async (req, res) => {
    const { title, isCompleted } = req.body

    const { subTaskId } = req.params

    const subTask = await SubTask.findByIdAndUpdate(
        subTaskId,
        {
            title,
            isCompleted
        },
        {
            new: true
        }
    )

    if (!subTask) {
        throw new ApiError(404, "subTask not found")
    };

    return res
        .status(201)
        .json(new ApiResponse(201, subTask, "SubTask updated successfully"))
});


const deleteSubTask = asyncHandler(async (req, res) => {
    const { subTaskId } = req.params

    const subTask = await SubTask.findByIdAndDelete( subTaskId );

    if(!subTask){
        throw new ApiError( 404 , "SubTask Not Found..")
    };

    return res 
        .status( 200 )
        .json( new ApiResponse( 200 , null ,"SubTask Deleted Successfully"))

});


export {
    getTask,
    createtask,
    getTaskDetail,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask
}