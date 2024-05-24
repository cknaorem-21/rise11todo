import Todo from "../models/todoModel.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const addTodo = async (req, res) => {
    
    try {
        const { title, description, priority } = req.body
        
        // create new Todo
        const newTodo = new Todo({
            title,
            description,
            priority,
            user: req.user
        })
    
        const savedTodo = await newTodo.save()

        res
        .status(201)
        .json(
            new ApiResponse(savedTodo, "Todo added successfully")
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

const getAllTodos = async (req, res) => {
    try {
        // get user id from req obj
        const userId = req.user._id.toString()

        // find todos of the user
        const todos = await Todo.find({user: userId})

        res
        .status(200)
        .json(
            new ApiResponse(todos, "todos fetched successfully")
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

const updateTodo = async (req, res) => {
    try {
        const {title, description, priority, isCompleted} = req.body

        // find the todo
        const todo = await Todo.findById(req.params.id)

        if(!todo) {
            throw new ApiError(404, "Todo not found")
        }

        // update the todo
        todo.title = title
        todo.description = description
        todo.priority = priority
        todo.isCompleted = isCompleted

        const updatedTodo = await todo.save()

        res
        .status(200)
        .json(
            new ApiResponse(updatedTodo, "Todo updated successfully")
        )
    } catch (error) {
        console.log(err.message)

        res
        .status(err.statusCode)
        .json({
            error: err.message
        })
    }
}

const deleteTodo = async (req, res) => {
    try {
        // find the todo
        const todo = await Todo.findById(req.params.id)

        if(!todo) {
            throw new ApiError(404, "Todo not found")
        }

        // delete the todo
        await Todo.deleteOne({_id: todo._id})

        res
        .status(200)
        .json(
            new ApiResponse(todo, "Todo deleted successfully")
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

export {
    addTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}