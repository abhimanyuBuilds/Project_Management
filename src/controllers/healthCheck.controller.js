import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/async-handler.js"



const healthCheck = asyncHandler(async (req , res)=> {
    res.status(200).json(
        new ApiResponse(200 , {message: "Server is Running"})
    )
})



/** 
const healthCheck = async(req , res) => {
    try {
        res 
            .status(200)
            .json(
                new ApiResponse ( 200 , {message: 'Server is Running'})
            )
    } catch (error) {
        
    }
}
 */


export {healthCheck}