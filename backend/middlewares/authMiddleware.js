import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import env from "../config/env.js"
import User from "../models/userModel.js"

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken
        // console.log("token", token)

        if(!token) {
            throw new ApiError(401, "Unauthorised access")
        }

        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET)

        // find user in DB
        const user = await User.findById(decoded._id).select("-password -refreshToken")

        if(!user) {
            throw new ApiError(401, "Unauthorised access")
        }

        req.user = user

        // console.log("user middleware", user)
        next()
        
    } catch (err) {
        console.log(err.message)

        res
        .status(err.statusCode)
        .json(
            {
                error: err.message
            }
        )
    }
}

export default authMiddleware