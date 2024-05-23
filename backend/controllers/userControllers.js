import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefreshToken.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const signUpUser = async (req, res) => {
    try{
        const { username, email, password } = req.body
    
        // check if the user already exists
        const user = await User.findOne({email : email})
        
        if(user) {
            console.log("user: ", user)
            throw new ApiError(409, "User already exists")
        }


        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
    
        // save the new user in DB
        await newUser.save()

        res
        .status(201)
        .json(
            new ApiResponse(null, "User created successfully")
        )
    } catch (err) {
        console.log(err.message)

        res
        .status(err.statusCode)
        .json({
            error: err.message
        })
    }    
}

const logInUser = async (req, res) => {
    try {
        const {email, username, password} = req.body
    
        // find user by email or username
        const user = await User.findOne({ $or: [{email}, {username}]})

        if(!user) {
            throw new ApiError(401, "Username or email does not exists")
        }
        
        // compare password with password in db
        const isCorrectPassword = await bcrypt.compare(password, user.password)

        console.log("isCorrectPassword: ", isCorrectPassword) 

        if(!isCorrectPassword) {
            throw new ApiError(401, "Incorrect Password")
        }   
        
        // generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const cookieOptions = {
            httpOnly: true,
            secure:true
        }

        res
        .status(200)
        .cookie("accesstoken", accessToken, cookieOptions)
        .cookie("refreshtoken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(null, "Logged in successfully")
        )
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

const logOutUser = (req, res) => {
    try{

    } catch(err) {
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

export {
    signUpUser,
    logInUser,
    logOutUser
}