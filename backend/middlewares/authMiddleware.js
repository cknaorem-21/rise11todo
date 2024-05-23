import { ApiError } from "../utils/ApiError"
import jwt from "jsonwebtoken"
import env from "../config/env.js"

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accesstoken

        if(!token) {
            throw new ApiError(401, "Unauthorised access")
        }

        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
        req.headers.userId = decoded._id
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