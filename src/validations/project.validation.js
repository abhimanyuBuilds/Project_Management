import Joi from "joi"
import {AvailableUserRole} from "../utils/constants.js"


export const createProjectValidator  = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .messages({
            'string.empty': 'name should be required'
        }),
    description: Joi.string()
        .trim()
        .optional()
        .max(1000)
}).options({
    allowUnknown: false
});




export const addMemberToProjectValidator = Joi.object({
    email: Joi.string()
        .trim()
        .required()
        .email()
        .messages({
            'string.empty': 'Email is required ',
            'string.email': 'please provide a valid email'
        }),
    role: Joi.string()
        .required()
        .valid(...AvailableUserRole)
        .messages({
            'string.empty': 'Role is required',
            'any.only': 'Invalid role'
        })
}).options({
    allowUnknown: false
}) ;