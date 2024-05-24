import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import env from "../config/env.js"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Name field is required"],
    },

    email: {
        type: String,
        unique: true,
        trim:true,
        required: [true, "email field is required"]
    },

    password: {
        type: String,
        required: [true, "password field is required"]
    },

    refreshToken: {
        type: String,
    }
}, { timeStamps: true })

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema)

export default User