import Router from "express"
import { registerUser, userLogin, logOutUser, refreshRotationToken,getCurrentUser, verifyEmail } from "../controllers/auth.controller.js"
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

 // =================================== BEGIN register user REST API Documentation ==============================
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

router.route("/register").post(validate(userRegisterValidation), registerLimitter, registerUser)

// ========================== End register user REST API Documentation ===========================



//  ============================= login user REST API Documentation =============================

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     operationId: loginUser
 *     description: |
 *       Authenticates a registered user using their email and password.
 *
 *       On successful authentication:
 *       - Returns the authenticated user's information.
 *       - Generates an Access Token.
 *       - Generates a Refresh Token.
 *       - Stores the Refresh Token securely.
 *       - Sets authentication cookies (if cookie-based authentication is enabled).
 *
 *       ### Validation Rules
 *       - Email must be a valid registered email.
 *       - Password must match the registered password.
 *       - Email must be verified before login.
 *
 *       ### Business Rules
 *       - Unverified users cannot login.
 *       - Incorrect credentials return Unauthorized.
 *       - Refresh Token is rotated on every successful login.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Registered email address.
 *                 example: john@gmail.com
 *
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: User password.
 *                 example: Password@123
 *
 *     responses:
 *
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Login Successful
 *               data:
 *                 user:
 *                   _id: 6a267bd910b5d5e933b22eab
 *                   avatar:
 *                        url: https://placehold.co/200x200
 *                        localPath: ""
 *                        _id: 6a267bd910b5d5e933b22eaa
 *                   username: super_user
 *                   role: admin 
 *                 accessToken: eyJhbGciOiJIUzI1NiIs.example.signature
 *                 refreshToken: eyJhbGciOiJIUzI1NiIs.example.signature
 *
 *       400:
 *         description: Validation Error.
 *         content: 
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 400  
 *               message: Email must be required to login
 *               data: null
 *                              
 *
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 401
 *               message: Invalid email or password
 *               data: null
 *
 *       403:
 *         description: Email not verified.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 403
 *               message: Please verify your email before logging in
 *               data: null
 *
 *       429:
 *         description: Too many login attempts.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 429
 *               message: Too many login attempts. Please try again later.
 *               data: null
 *
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Something went wrong while logging in
 *               data: null
 */

router.route("/login").post(validate(userLoginValidation), loginLimiter, userLogin)
// =========================== End of Login user REST API Documentation ===============================



// =================================  BEGIN  logout user REST API Documentation   ======================


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     operationId: logoutUser
 *     description: |
 *       Logs out the currently authenticated user.
 *
 *       On successful authentication:
 *          
 *       - Requires a valid JWT Access Token
 *
 *       ### Business Rules
 *       - Remove the stored Refresh Token.
 *       - Invalidates the user's current session..
 *       - Clears authentication cookies (if cookie-based authentication is used).
 *       - User must be authenticated.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *
 *       200:
 *         description: User Logged out successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: User Logged out successfully.
 *                                            
 *
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 401
 *               message: Unauthorized. Invalid or expired token.
 *               data: null
 *
 *
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Something went wrong while logging out
 *               data: null
 */

router.route("/logout").post(verifyJWT, logOutUser)
// ========================= End of logout user REST API Documentation ===================================


// =============================   BEGIN  Verify-email REST API Documentation ================================
/**
 * @swagger
 * /auth/verify-email/{verificationToken}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verify user email
 *     operationId: verifyEmail
 *     description: |
 *       Verifies a user's email address using the email verification token.
 *
 *       When a user registers, a verification email containing a unique token
 *       is sent to their email address.
 *
 *       Clicking the verification link calls this endpoint.
 *
 *       ### Business Rules
 *       - Verification token must be valid.
 *       - Verification token must not be expired.
 *       - Token can only be used once.
 *       - After successful verification:
 *         - User email becomes verified.
 *         - Verification token is removed.
 *         - Verification expiry is removed.
 *
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token.
 *         example: 5ef7b7bc44faed5fd9a7b7bbbdaf7ea943dddc7f
 *
 *     responses:
 *
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Email is Verified
 *               data:
 *                 isEmailVerified: true
 *
 *       400:
 *         description: Invalid or expired verification token.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 400
 *               message: Token is Invalid or expired
 *
 *       404:
 *         description: Verification token not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 404
 *               message: Verification token not found
 *
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Something went wrong while verifying email
 */
router.route("/verify-email/:verificationToken").post(verifyJWT, verifyEmailLimiter, verifyEmail)
// ==============================  End of Verify-Email REST API Documentation ===============================
router.route("/currentUser").get(verifyJWT , getCurrentUser) 



router.route("/refresh-token").post( refreshRotationToken)
export default router
