import {Router} from "express";
import {healthCheck} from "../controllers/healthCheck.controller.js"


const router = Router()



/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: API to check if the server is running
 */

/**
 * @swagger
 * /api/v1/healthcheck:
 *   get:
 *     summary: Check server health
 *     description: Returns a message indicating that the server is running.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: Server is running successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Server is Running
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *       500:
 *         description: Internal Server Error
 */


router.route("/").get(healthCheck);

export default router ;