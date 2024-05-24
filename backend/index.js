import express from "express"
import userRoutes from "./routes/userRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import env from "./config/env.js"
import connectDB from "./config/connectDB.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

const app = express()
const port = env.PORT || 5000

connectDB()

app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({ extended: true, limit: "10kb" }))
app.use(cookieParser())


app.use("/api/users", userRoutes)
app.use("/api/todos", todoRoutes)

app.listen(port, (err)=>{
    if(err) {
        console.log("Error in setting up server")
    }

    console.log(`server listening in on port ${port}`)
})