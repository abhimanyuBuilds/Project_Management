import Joi from "joi"

export const createtaskValidation = Joi.object({
    title: Joi.string()
        .trim()
        .required()
        .min(3)
        .max(300)
        .messages({
            'string.empty': "title should be required"
        }),
    description: Joi.string()
        .trim()
        .min(3)
        .max(1000)
        .optional(),
    assignedTo: Joi.string()
        .required(),
    // status: Joi.string()
    //     .valid(...AvailableTaskStatus)
    //     .required()

}).options({
    allowUnknown: false
});


export const updateTaskValidation = Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(300)
        .messages({
            'string.empty': "title is required to update"
        }),
    description: Joi.string()
        .optional()
        .trim()
        .min(3)
        .max(1000),
}).options({
    allowUnknown: false
});

export const createSubTaskValidation = Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(300)
        .messages({
            'string.empty': "title is required to create subTask"
        })
}).options({
    allowUnknown: false
});

export const updateSubTaskValidation = Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(300)
        .messages({
            'string.empty': "title is required to update the task"
        })
}).options({
    allowUnknown: false
})










