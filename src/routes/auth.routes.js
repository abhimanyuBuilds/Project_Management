import Router from "express"
import { registerUser, userLogin, logOutUser, getCurrentUser, verifyEmail } from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validation.middleware.js"
import { userRegisterValidation, userLoginValidation } from "../validations/auth.validation.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    apiLimiter,
    loginLimiter,
    registerLimitter,
    forgotPasswordRateLimiter,
    verifyEmailLimiter
} from "../middlewares/rateLimit.middleware.js"

const router = Router()


/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     operationId: registerUser
 *     description: |
 *       Creates a new user account and sends an email verification link.
 *
 *       ### Validation Rules
 *       - Email must be unique.
 *       - Username must be unique.
 *       - Password must be at least 8 characters.
 *       - Role must be one of:
 *         - admin
 *         - member
 *         - project_admin
 *
 *       After successful registration, a verification email is sent to the user's email address.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address.
 *                 example: john@gmail.com
 *
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 description: Unique username.
 *                 example: john_doe
 *
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: User password.
 *                 example: Password@123
 *
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - member
 *                   - project_admin
 *                 description: User role.
 *                 example: member
 *
 *     responses:
 *
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: User registered Successfully and Verification Email has been sent on your email.
 *               data:
 *                 user:
 *                   _id: 6867d8fd9d15f6fdc73ef123
 *                   username: john_doe
 *                   email: john@gmail.com
 *                   role: member
 *                   isEmailVerified: false
 *                   avatar:
 *                     url: https://placehold.co/200x200
 *                   createdAt: 2026-07-04T11:25:11.000Z
 *                   updatedAt: 2026-07-04T11:25:11.000Z
 *
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Validation Error
 *               errors:
 *                 - field: email
 *                   message: Invalid email format
 *
 *       409:
 *         description: User already exists.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 409
 *               message: User with this Email or username exists
 *
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Something went wrong while registering a user
 */




router.route("/register").post(validate(userRegisterValidation), registerLimitter , registerUser)

router.route("/login").post(validate(userLoginValidation), loginLimiter,userLogin)
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/verify-email").post(verifyJWT, verifyEmailLimiter, verifyEmail)

export default router


    