import mongoose, {Schema} from "mongoose"

const todoPriority = {
    low: "low",
    medium: "medium",
    high: "high"
}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    priority: {
        type: String,
        enum: Object.values(todoPriority)
    },
    
    isCompleted: {
        type: Boolean,
        default: false
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Todo = mongoose.model("Todo", todoSchema)

export default Todo