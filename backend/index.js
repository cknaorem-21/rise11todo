import express from "express"
import userRoutes from "./routes/userRoutes.js"
import env from "./config/env.js"
import connectDB from "./config/connectDB.js"

const app = express()
const port = env.PORT || 5000

connectDB()

app.use("/api/users", userRoutes)

app.listen(port, (err)=>{
    if(err) {
        console.log("Error in setting up server")
    }

    console.log(`server listening in on port ${port}`)
})