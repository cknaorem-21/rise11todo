import mongoose from "mongoose"
import env from "./env.js"

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("conneted to mongoDB")
        })

        mongoose.connection.on("error", () => {
            console.log("error connecting to mongoDB")
        })

        await mongoose.connect(env.MONGODB_URI)
    } catch (err) {
        console.log("mongoDB connection error: ", err.message)
        process.exit(1)
    }
}

export default connectDB