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
import multer from "multer"
import { upload } from "../middlewares/multer.middleware.js"


const router = Router()


router.use(verifyJWT)


console.log("Task route loaded")


router// ✅
    .route("/:projectId/createTask")
    .post(userProjectPermission([UserRoleEnum.ADMIN]), upload.array("attachments"), validate(createtaskValidation), createtask)

router
    .route("/subtask/:subTaskId")
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(updateSubTaskValidation), updateSubTask) // ✅
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteSubTask)  // 

router
    .route("/:projectId/:taskId/create-SubTask")
    .post(userProjectPermission([UserRoleEnum.ADMIN]), validate(createSubTaskValidation), createSubTask) // ✅



router // ✅
    .route("/:projectId/:taskId")
    .get(getTaskDetail) // ✅
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(updateTaskValidation), updateTask) // ✅
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteTask) // ✅

export default router