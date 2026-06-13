import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import  ProjectMember  from "../models/projectmember.model.js"
import mongoose from "mongoose"

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
   return  asyncHandler(async (req, res, next) => {
        const { projectId } = req.params

        if (!projectId) {
            throw new ApiError(400, "ProjectId is missing")
        };
        console.log('projectId', projectId)
        console.log("req.user",req.user._id)
        const project = await ProjectMember.findOne({
            project: new mongoose.Types.ObjectId(projectId),
            user: new mongoose.Types.ObjectId(req.user._id)
        });

          if (!project) {
            throw new ApiError(400, "Project not found..")
        };

        const givenRole = project?.role

        req.user.role = givenRole
        console.log("givenRole" , givenRole)
        console.log("Allowed role" , roles)
        if(!roles.includes(givenRole)){
            throw new ApiError( 403 ," You do not have permission to perform the action")
        };
        next()

    });
};