import express from "express"
import { signUpUser, logInUser, logOutUser } from "../controllers/userControllers.js"

const router = express.Router()

router.post("/signup", signUpUser)
router.post("/login", logInUser)
router.post("/logout", logOutUser)

export default router