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


/*  ✅ All routes are tested ✅*/
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project Management APIs
 */

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: Get all projects of logged-in user
 *     description: Returns all projects in which the authenticated user is a member.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: {}
 *     responses:
 *       200:
 *         description: Projects fetched successfully.
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         example: ADMIN
 *                       project:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 686e2fb8d57a4a9a9d7d91f4
 *                           name:
 *                             type: string
 *                             example: Task Management System
 *                           description:
 *                             type: string
 *                             example: Backend API project
 *                           createdBy:
 *                             type: string
 *                             example: 686d2fb8d57a4a9a9d7d91f1
 *                           members:
 *                             type: integer
 *                             example: 5
 *                 message:
 *                   type: string
 *                   example: Projects fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 *   post:
 *     summary: Create a new project
 *     description: Creates a project and automatically adds the logged-in user as the ADMIN.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: CRM Backend
 *               description:
 *                 type: string
 *                 example: REST API for CRM application
 *     responses:
 *       201:
 *         description: Project created successfully.
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
 *                       example: 686e2fb8d57a4a9a9d7d91f4
 *                     name:
 *                       type: string
 *                       example: CRM Backend
 *                     description:
 *                       type: string
 *                       example: REST API for CRM application
 *                     createdBy:
 *                       type: string
 *                       example: 686d2fb8d57a4a9a9d7d91f1
 *                 message:
 *                   type: string
 *                   example: Project Created Successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */


router
    .route("/")
    .get(getProjects)
    .post(validate(createProjectValidator), createProject);

/**
 * @swagger
 * /api/v1/projects/{projectId}:
 *   get:
 *     summary: Get project by ID
 *     description: Returns a single project using its project ID.
 *     tags:
 *       - Projects
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
 *     responses:
 *       200:
 *         description: Project fetched successfully.
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
 *                     name:
 *                       type: string
 *                       example: Task Management System
 *                     description:
 *                       type: string
 *                       example: Backend project
 *                     createdBy:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: Project fetched successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 *
 *   put:
 *     summary: Update project
 *     description: Update project name and description.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           example: 686f7b9f7f3c1b2c5d8a1234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated CRM Backend
 *               description:
 *                 type: string
 *                 example: Updated project description
 *     responses:
 *       200:
 *         description: Project updated successfully.
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete project
 *     description: Deletes a project by its ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           example: 686f7b9f7f3c1b2c5d8a1234
 *     responses:
 *       201:
 *         description: Project deleted successfully.
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router
    .route("/:projectId") 
    .get(userProjectPermission(UserRoleEnum), getProjectById)
    .put(userProjectPermission([UserRoleEnum.ADMIN]), validate(createProjectValidator), updateProject)
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteProject)







 /**
 * @swagger
 * /api/v1/projects/{projectId}/members:
 *   get:
 *     summary: Get all project members
 *     description: Returns all members of the specified project.
 *     tags:
 *       - Project Members
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
 *     responses:
 *       200:
 *         description: Project members fetched successfully.
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       project:
 *                         type: string
 *                         example: 686f7b9f7f3c1b2c5d8a1234
 *                       role:
 *                         type: string
 *                         example: MEMBER
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           username:
 *                             type: string
 *                             example: john123
 *                           fullName:
 *                             type: string
 *                             example: John Doe
 *                           avatar:
 *                             type: string
 *                             example: https://example.com/avatar.jpg
 *                 message:
 *                   type: string
 *                   example: project members fetched..
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *
 *   post:
 *     summary: Add member to project
 *     description: Add a new member to a project or update their role if they already exist.
 *     tags:
 *       - Project Members
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - MEMBER
 *                 example: MEMBER
 *     responses:
 *       201:
 *         description: Member added successfully.
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
 *                   example: project member added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or project not found
 */   
router
    .route("/:projectId/members") 
    .get(getProjectMembers)
    .post(userProjectPermission([UserRoleEnum.ADMIN]), validate(addMemberToProjectValidator)
        , addMembersToProject
    )

/**
 * @swagger
 * /api/v1/projects/{projectId}/members/{userId}:
 *   put:
 *     summary: Update project member role
 *     description: Updates the role of a member in a project. Only ADMIN users can perform this action.
 *     tags:
 *       - Project Members
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
 *         name: userId
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *           example: 686f8c2d8a9b1d2f4e5a6789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newRole
 *             properties:
 *               newRole:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - MEMBER
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: Project member role updated successfully.
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
 *                   example: Project Member role updated successfully
 *       400:
 *         description: Invalid role or project member not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 *   delete:
 *     summary: Remove member from project
 *     description: Removes a member from a project. Only ADMIN users can perform this action.
 *     tags:
 *       - Project Members
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
 *         name: userId
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *           example: 686f8c2d8a9b1d2f4e5a6789
 *     responses:
 *       201:
 *         description: Project member deleted successfully.
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
 *                 message:
 *                   type: string
 *                   example: Project member deleted successfully
 *       400:
 *         description: Project member not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router
    .route("/:projectId/members/:userId") 
    .put(userProjectPermission([UserRoleEnum.ADMIN]), updateMemberRole)
    .delete(userProjectPermission([UserRoleEnum.ADMIN]), deleteMember)

export default router 