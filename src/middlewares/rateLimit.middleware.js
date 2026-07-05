import {rateLimit} from "express-rate-limit"

export const apiLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW , // 15min 
    max: process.env.RATE_LIMIT_MAX, 
    standardHeaders: true , 
    legacyHeaders: false , 
    message: {
        success: false ,
        status: 429,
        message: "Too many request. please try again later"
    }
});


export const loginLimiter = rateLimit({
    windowMs:process.env.RATE_LIMIT_WINDOW1  , 
    max:  process.env.RATE_LIMIT_MAX1 ,
    standardHeaders: true , 
    legacyHeaders: false ,
    message: {
        success: false , 
        status: 429 , 
        message: "Too many request . please try again later"
    }
});


export const registerLimitter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW1 ,
    max: process.env.RATE_LIMIT_MAX1 , 
    standardHeaders: true , 
    legacyHeaders: false ,
    message: {
        success: false , 
        status: 429 , 
        message: "Too many request . please try again later"
    }
});


export const forgotPasswordRateLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW,
    max: process.env.RATE_LIMIT_MAX1 ,
    standardHeaders: true , 
    legacyHeaders: false , 
    message: {
        success: false ,
        status: 429 , 
        message: "Too many request. please try again later"
    }
});



export const verifyEmailLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW,
    max: process.env.RATE_LIMIT_MAX1, 
    standardHeaders: true , 
    legacyHeaders: false ,
    message: {
        success: false , 
        status: 429 ,
        message: "Too many request . please try again later"
    }
});
