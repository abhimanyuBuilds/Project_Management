import {Router} from "express"
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMembersToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMember
} from "../controllers/project.controller.js"
import { validate } from "../middlewares/validation.middleware.js"
import { createProjectValidator, addMemberToProjectValidator } from "../validations/project.validation.js"
import { verifyJWT, userProjectPermission } from "../middlewares/auth.middleware.js"
import {  UserRoleEnum , AvailableUserRole } from "../utils/constants.js"

const router = Router()

router.use(verifyJWT)
console.log("Project route loaded")

router
    .route("/")
    .get(getProjects)
    .post(validate(createProjectValidator), createProject)


router
    .route("/:projectId")
    .get(userProjectPermission(UserRoleEnum), getProjectById)
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(createProjectValidator), updateProject)
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteProject)


router
    .route("/:projectId/members")
    .get(getProjectMembers)
    .post(userProjectPermission([UserRoleEnum.ADMIN]), validate(addMemberToProjectValidator)
        , addMembersToProject
    )
router
    .route("/:projectId/members/:userId")
    .put(userProjectPermission([UserRoleEnum.ADMIN]), updateMemberRole)
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteMember)

export default router 