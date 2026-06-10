import Joi from "joi"
import { AvailableUserRole } from "../utils/constants.js"


export const userRegisterValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': "Email is required",
            'string.email': "Please provide a valid email"
        }),
    username: Joi.string()
        .trim()
        .required()
        .min(3)
        .max(30)
        .messages({
            'string.empty': "username is required",
            'string.min': "User name must be at least 3 character",
            'string.max': "user name can not exceed 30 character"
        }),
    password: Joi.string()
        .trim()
        .min(6)
        .max(25)
        .required()
        .messages({
            'string.empty': 'password is required' , 
            'string.min': "Please provide at least 6 character of password" , 
            'string.max': "password cannot exceed 25 character"
        }),
    role: Joi.string()
        .optional()
        .valid(...AvailableUserRole)
        .messages({
            'any.only': "Invalid Role"
        })
}).options({
    allowUnknown: false
});


export const userLoginValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': "Email must be required to login"
        }),
    password: Joi.string()
        .trim()
        .required()
        .min(6)
        .max(25)
        .messages({
            'string.empty': "password must be required to login"
        })
}).options({
    allowUnknown: false
});