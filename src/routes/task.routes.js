import { Router } from "express"
import {
    getTask,
    createtask,
    getTaskDetail,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask
} from "../controllers/task.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { verifyJWT, userProjectPermission } from "../middlewares/auth.middleware.js";
import { UserRoleEnum, AvailableUserRole } from "../utils/constants.js";
import {
    createtaskValidation,
    updateTaskValidation,
    createSubTaskValidation,
    updateSubTaskValidation
} from "../validations/task.validation.js";


const router = Router()


router.use(verifyJWT)


console.log("Task route loaded")




router
    .route("/:projectId/createTask")
    .get(getTask)
    .post(userProjectPermission([UserRoleEnum.ADMIN]), validate(createtaskValidation), createtask)

router
    .route("/:taskId")
    .get(getTaskDetail)
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(updateTaskValidation), updateTask)
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteTask)

router
    .route("/:taskId/create-SubTask")
    .post(userProjectPermission([UserRoleEnum.ADMIN]), validate(createSubTaskValidation), createSubTask)

router
    .route("/subtask/:subTaskId")
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(updateSubTaskValidation), updateSubTask)
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteSubTask)



