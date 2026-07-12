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

/**
 * @swagger
 * /api/v1/tasks/{projectId}/createTask:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for a project. Only project admins can create tasks. Supports multiple file attachments.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: MongoDB Project ID
 *         schema:
 *           type: string
 *           example: 686f7b9f7f3c1b2c5d8a1234
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Build Authentication API
 *               description:
 *                 type: string
 *                 example: Implement JWT authentication for users.
 *               assignedTo:
 *                 type: string
 *                 description: MongoDB User ID
 *                 example: 686f8c2d8a9b1d2f4e5a6789
 *               status:
 *                 type: string
 *                 enum:
 *                   - TODO
 *                   - IN_PROGRESS
 *                   - DONE
 *                 example: TODO
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     project:
 *                       type: string
 *                     assignedTo:
 *                       type: string
 *                     status:
 *                       type: string
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                           mimetype:
 *                             type: string
 *                           size:
 *                             type: integer
 *                 message:
 *                   type: string
 *                   example: Task Created Successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router// ✅
    .route("/:projectId/createTask")
    .post(userProjectPermission([UserRoleEnum.ADMIN]), upload.array("attachments"), validate(createtaskValidation), createtask)

/**
 * @swagger
 * /api/v1/tasks/subtask/{subTaskId}:
 *   put:
 *     summary: Update a subtask
 *     description: Updates the title or completion status of a subtask. Only project admins can update a subtask.
 *     tags:
 *       - SubTasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subTaskId
 *         required: true
 *         description: MongoDB SubTask ID
 *         schema:
 *           type: string
 *           example: 686f9bcd7f3c1b2c5d8a1234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design Login Page
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: SubTask updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                   example: SubTask updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: SubTask not found
 *
 *   delete:
 *     summary: Delete a subtask
 *     description: Deletes a subtask using its ID. Only project admins can delete a subtask.
 *     tags:
 *       - SubTasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subTaskId
 *         required: true
 *         description: MongoDB SubTask ID
 *         schema:
 *           type: string
 *           example: 686f9bcd7f3c1b2c5d8a1234
 *     responses:
 *       200:
 *         description: SubTask deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: SubTask Deleted Successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: SubTask not found
 */



router
    .route("/subtask/:subTaskId")
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(updateSubTaskValidation), updateSubTask) // ✅
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteSubTask)  //
    
    

/**
 * @swagger
 * /api/v1/tasks/{projectId}/{taskId}/create-SubTask:
 *   post:
 *     summary: Create a subtask
 *     description: Creates a new subtask for an existing task. Only project admins can create subtasks.
 *     tags:
 *       - SubTasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: MongoDB Project ID
 *         schema:
 *           type: string
 *           example: 686f7b9f7f3c1b2c5d8a1234
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: MongoDB Task ID
 *         schema:
 *           type: string
 *           example: 686fa3c27f3c1b2c5d8a5678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design Login UI
 *               isCompleted:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: SubTask created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                       example: Design Login UI
 *                     task:
 *                       type: string
 *                       example: 686fa3c27f3c1b2c5d8a5678
 *                     isCompleted:
 *                       type: boolean
 *                       example: false
 *                     createdBy:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: SubTask created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router
    .route("/:projectId/:taskId/create-SubTask")
    .post(userProjectPermission([UserRoleEnum.ADMIN]), validate(createSubTaskValidation), createSubTask) // ✅

/**
 * @swagger
 * /api/v1/tasks/{projectId}/{taskId}:
 *   get:
 *     summary: Get task details
 *     description: Fetch complete details of a task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: MongoDB Project ID
 *         schema:
 *           type: string
 *           example: 686f7b9f7f3c1b2c5d8a1234
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: MongoDB Task ID
 *         schema:
 *           type: string
 *           example: 686fa3c27f3c1b2c5d8a5678
 *     responses:
 *       200:
 *         description: Task details fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                     assignedTo:
 *                       type: object
 *                     project:
 *                       type: object
 *                 message:
 *                   type: string
 *                   example: Task details fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *
 *   put:
 *     summary: Update a task
 *     description: Updates an existing task. Only project admins can perform this action.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           example: 686f7b9f7f3c1b2c5d8a1234
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *           example: 686fa3c27f3c1b2c5d8a5678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Update Authentication Module
 *               description:
 *                 type: string
 *                 example: Complete JWT authentication implementation.
 *               project:
 *                 type: string
 *                 example: 686f7b9f7f3c1b2c5d8a1234
 *               assignedTo:
 *                 type: string
 *                 example: 686f8c2d8a9b1d2f4e5a6789
 *               status:
 *                 type: string
 *                 enum:
 *                   - TODO
 *                   - IN_PROGRESS
 *                   - DONE
 *                 example: IN_PROGRESS
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 *
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by its ID. Only project admins can delete tasks.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           example: 686f7b9f7f3c1b2c5d8a1234
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *           example: 686fa3c27f3c1b2c5d8a5678
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Deleted task successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */

router // ✅
    .route("/:projectId/:taskId")
    .get(getTaskDetail) // ✅
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(updateTaskValidation), updateTask) // ✅
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteTask) // ✅

export default router