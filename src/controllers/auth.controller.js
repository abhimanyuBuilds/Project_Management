import User from "../models/user.model.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

import { emailVerifificationMailgenContent, forgotPasswordVerificationMailgenContent , sendEmail } from "../utils/Mail.js"
import jwt from "jsonwebtoken";








const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId);
        const accessToken =   user.generateAccessToken();
        const refreshToken =  user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: true })
        return { accessToken , refreshToken }


    } catch (error) {
        console.log("Token error" , error)
        throw new ApiError(
            500,
            "Something went wrong while generating access token",
        );
    }
};

// Register 
const registerUser = asyncHandler(async (req, res) => {

     const { email, username, password, role } = req.body

    const existedUser = await User.findOne(
         { email },
    );

    if (existedUser) {
        throw new ApiError(409, "User with this Email or username exists", []);
    };

    const user = await User.create({
        email,
        username,
        password,
        role,
        isEmailVerified: false,
    });

    const { unHashedToken, HashedToken, tokenExpiry } =
        user.generateTempToken()

    user.emailVerificationToken = HashedToken
    user.emailVerificationExpiry = tokenExpiry


console.log("Recipient:", email);

    await sendEmail({
        email: user.email,
        subject: "Please verify your email",
        mailgenContent: emailVerifificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${unHashedToken} `
        ),
    });

    const createdUser = await User.findById(user._id)
        .select(" -password  -refreshToken -emailVerificationToken -emailVerificationExpiry ")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201, { user: createdUser }, "User registered Successfully and Verification Email has been sent on your email.",
            ),
        );
        console.log("user created successfully")

});

// Login 
const userLogin = asyncHandler(async (req, res) => {
    const { email,  password } = req.body

    if (!email ) {
        throw new ApiError(400, "email is required to login")
    };

    if (!password) {
        throw new ApiError(400, "Password is required to login")
    };


    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found Please register first to login...")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(404, "Invalid Credentials")
    };


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id,);


    const loggedInUser = await User.findById(user._id)
        .select(" -password -refreshToken -emailVerificationExpiry -emailVerificationToken  -email -isEmailVerified  -createdAt -updatedAt -url -localPath -__v",);


    const options = {
        httpOnly: true,
        secure: true
    };

    return res 
        .status(200)
        .cookie('accessToken' , accessToken , options)
        .cookie('refreshToken' , refreshToken , options)
        .json(
            new ApiResponse( 200 , 
                {user: loggedInUser ,
                     accessToken ,
                      refreshToken} , 
                "User LoggedIn Successfully"
            
            
            ),
        );
});

//logout
const logOutUser = asyncHandler(async ( req , res)=> {



    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: null,
            },
        },
        {
            new: true,
        },
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res 
        .status(200)
        .clearCookie('accessToken' ,  options)
        .clearCookie('refreshToken' ,  options)
        .json(
            new ApiResponse( 200 , 
                {} , 
                "User logged Out successfully",
            ),
        );
});

// getCurrentUser


const getCurrentUser = asyncHandler(async ( req , res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200 , req.user , "Current User fetched successfully")
        )
});



const verifyEmail = asyncHandler(async ( req , res)=>{
    const { verificationToken} = req.params

    if(!verificationToken){
        throw new ApiError(400 , "Email verification token is missing..")
    }


    let hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex")

    const user = await User.findOne({
        emailVerificationToken: hashedToken , 
        emailVerificationExpiry: {$gt: Date.now()},
    })

    if(!user){
        throw new ApiError(400 , "Token is Invalid or expired")
    }

    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined


    user.isEmailVerified = true

    await user.save({validateBeforeSave: false})

    return res 
        .status(200)
        .json(
            new ApiResponse(200 , {
                isEmailVerified: true
            },
        "Email is Verified",
            )
        )
    });



export {registerUser , userLogin , logOutUser , getCurrentUser  , verifyEmail}