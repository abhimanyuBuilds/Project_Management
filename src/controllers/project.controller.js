import User from "../models/user.model.js"
import Project from "../models/project.model.js"
import ProjectMember from "../models/projectmember.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async-handler.js"
import mongoose from "mongoose"
import { AvailableUserRole, UserRoleEnum } from "../utils/constants.js"





const getProjects = asyncHandler(async (req, res) => {
    const projects = await ProjectMember.aggregate([{
        $match: {
            user: new mongoose.Types.ObjectId(req.user._id),
        },
    },
    {
        $lookup: {
            from: "projects",
            localField: "project",
            foreignField: "_id",
            as: "projects",
            pipeline: [
                {
                    $lookup: {
                        from: "projectmembers",
                        localField: "_id",
                        foreignField: "project",
                        as: "projectmembers"
                    },
                },
                {
                    $addFields: {
                        members: {
                            $size: "$projectmembers"
                        },
                    },
                },
            ],
        },
    },
    {
        $unwind: "$projects",
    },
    {
        $project: {
            project: "$projects",
            role: 1,
            _id: 0
        },
    },
    ]);
    return res
        .status(200)
        .json(new ApiResponse(200, projects, "Projects fetched successfully"))
});

const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, project, "project fetched successfully"))
});



const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    const project = await Project.create({
        name,
        description,
        createdBy: new mongoose.Types.ObjectId(req.user._id)
    });

    await ProjectMember.create({
        user: new mongoose.Types.ObjectId(req.user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role: UserRoleEnum.ADMIN
    }
    );
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                project,
                "Project Created Successfully"
            )
        )

});


const updateProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    const { projectId } = req.params



    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description
        },
        { new: true }
    )


    if (!project) {
        throw new ApiError(404, "project not found")
    };

    return res
        .status(200)
        .json(
            new ApiResponse(200, project, "Project updated successfully")
        )
});


const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    // const project = await Project.findById(projectId)
    const project = await Project.findByIdAndDelete(
        projectId
    )

    if (!project) {
        throw new ApiError(404, "Project not found")
    };

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Project deleted successfuly")
        )

});


const addMembersToProject = asyncHandler(async (req, res) => {
    const { email, role } = req.body
    const { projectId } = req.params
    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exit")
    }

    await ProjectMember.findOneAndUpdate(
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId)
        },
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
            role: role
        },
        {
            new: true,
            upsert: true,
        },
    );
        console.log(user._id)
        console.log(projectId)

    return res
        .status(201)
        .json(new ApiResponse(201, ProjectMember, "project member added successfully"));

});


const getProjectMembers = asyncHandler(async (req, res) => {

    const { projectId } = req.params

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, "Project not found")
    };

    const projectMembers = await ProjectMember.aggregate([
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId)
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                user: {
                    $arrayElemAt: ["$user", 0]
                }
            }
        },
        {
            $project: {
                project: 1,
                user: 1,
                role: 1,
                createdAt: 1,
                updatedAt: 1,
                _id: 0
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, projectMembers, "project members fetched.."))
});

const updateMemberRole = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params;
    const { newRole } = req.body;

  

    if (!AvailableUserRole.includes(newRole)) {
        throw new ApiError(400, "Invalid Role")
    }

    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });

    if (!projectMember) {
        throw new ApiError(400, "Project member not found")
    };


   const UpdatedProjectMember = await ProjectMember.findByIdAndUpdate(
        projectMember._id,
        {
            role: newRole
        },
        {
            new: true
        }
    );

    if (!UpdatedProjectMember) {
        throw new ApiError(400, "No Project Member has been found")
    };

    return res
        .status(201)
        .json(new ApiResponse(201, UpdatedProjectMember, "Project Member role updated successfully"))
});


const deleteMember = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params;

    let projectMemberFound = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    });

    if (!projectMemberFound) {
        throw new ApiError(400, " Project Member not found")
    };

    const projectMembers = await ProjectMember.findOneAndDelete(ProjectMember._id);


    if (!projectMembers) {
        throw new ApiError(400, "Project member not found")
    };

    return res
        .status(201)
        .json(new ApiResponse(201,  "Project member deleted successfully"))
});


export {

    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMembersToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMember

}