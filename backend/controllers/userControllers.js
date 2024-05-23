import bcrypt from "bcrypt"
import User from "../models/userModel.js"

const signUpUser = async (req, res) => {
    try{
        const { name, email, password } = req.body
    
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        // create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
    
        // save the new user in DB
        await newUser.save()

        res.json(
            {
                message: "User saved successfully"
            }
        )
    } catch (err) {
        console.log(err)
    }    
}

const logInUser = (req, res) => {
    res.end("response from loginUser")
}

const logOutUser = (req, res) => {
    res.end("response from logOutUser")
}

export {
    signUpUser,
    logInUser,
    logOutUser
}