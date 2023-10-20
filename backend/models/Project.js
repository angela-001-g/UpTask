import mongoose from "mongoose";

const projectsSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: true
    },
    description: {
        type: String,
        trim: true, 
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now()
    },
    customer: {
        type: String,
        trim: true, 
        required: true
    }, 
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectsSchema)

export default Project