import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import  ProjectMember  from "../models/projectmember.model.js"
import mongoose from "mongoose"
import SubTask from "../models/subtask.model.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request")
    };

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken -emailVerificationExpiry -emailVerificationToken  -email -isEmailVerified -role -createdAt -updatedAt -avatar -url -localPath -__v",);



        if (!user) {
            throw new ApiError(401, "Invalid access Token.")
        }

        req.user = user
        next()

    } catch (error) {
        console.log("JWT ERROR", error);
        throw new ApiError(401, error.message)
    }
});


export const userProjectPermission = (roles = []) => {
    return asyncHandler(async (req, res, next) => {

        let projectId = req.params.projectId;

        // If projectId isn't in the URL, derive it
        if (!projectId) {

            if (req.params.taskId) {
                const task = await Task.findById(req.params.taskId);

                if (!task) {
                    throw new ApiError(404, "Task not found");
                }

                projectId = task.project;
            }

            else if (req.params.subTaskId) {

                const subTask = await SubTask.findById(req.params.subTaskId)
                    .populate({
                        path: "task",
                        select: "project"
                    });

                if (!subTask) {
                    throw new ApiError(404, "SubTask not found");
                }

                projectId = subTask.task.project;
            }
        }

        const project = await ProjectMember.findOne({
            project: projectId,
            user: req.user._id
        });

        if (!project) {
            throw new ApiError(403, "Project not found or access denied");
        }

        req.user.role = project.role;

        if (!roles.includes(project.role)) {
            throw new ApiError(403, "You do not have permission");
        }

        next();
    });
};