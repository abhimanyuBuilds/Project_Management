import Router from "express"
import { registerUser , userLogin , logOutUser , getCurrentUser , verifyEmail } from "../controllers/auth.controller.js"
import {validate} from "../middlewares/validation.middleware.js"
import {userRegisterValidation , userLoginValidation} from "../validations/auth.validation.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()


router.route("/register").post(validate(userRegisterValidation) , registerUser )

router.route("/login").post(validate(userLoginValidation) , userLogin)
router.route("/logout").post(verifyJWT , logOutUser)
router.route("/verify-email").post(verifyJWT , verifyEmail)

export default router