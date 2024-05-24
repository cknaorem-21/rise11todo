import express from "express"
import { addTodo, getAllTodos, updateTodo, deleteTodo } from "../controllers/todoController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route("/")
.post(authMiddleware, addTodo)
.get(authMiddleware, getAllTodos)

router.route("/:id")
.put(authMiddleware, updateTodo)
.delete(authMiddleware, deleteTodo)

export default router