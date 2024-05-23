import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
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
    }
})

const User = mongoose.model("User", UserSchema)

export default User