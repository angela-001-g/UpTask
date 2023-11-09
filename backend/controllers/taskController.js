import Project from "../models/Project.js"
import Task from "../models/Task.js"

const addTask = async(req, res) => {
    
    const { project } = req.body;

    const projectExist = await Project.findById(project)
    
    if(!projectExist){
        const error = new Error('Project does not exist')
        return res.status(404).json({msg: error.message})
    }

    if(projectExist.creator.toString() !== req.user._id.toString()){
        const error = new Error('You dont have permissions to add tasks')
        return res.status(403).json({msg: error.message})
    }

    try {
        const storageTask = await Task.create(req.body)
        // Almacenar ID en el proyecto
        projectExist.tasks.push(storageTask._id);
        await projectExist.save();
        res.json(storageTask);
    } catch (error) {
        console.log(error)
    }

} 

const getTask = async(req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate("project")

    if(!task){
        const error = new Error('Task not found')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Action not allowed')
        return res.status(403).json({msg: error.message})
    }

    res.json(task)
} 

const updateTask = async(req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate("project")

    if(!task){
        const error = new Error('Task not found')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Action not allowed')
        return res.status(403).json({msg: error.message})
    }

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority; 
    task.deadline = req.body.deadline || task.deadline;

    try {
        const storageTask = await task.save()
        res.json(storageTask)
    } catch (error) {
        console.log(error)
    }
} 

const deleteTask = async(req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate("project")

    if(!task){
        const error = new Error('Task not found')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error('Action not allowed')
        return res.status(403).json({msg: error.message})
    }

    try {
        await task.deleteOne()
        res.json({msg: "The task was deleted"})
    } catch (error) {
        console.log(error)
    }
} 

const changeStatus = async(req, res) => {
    
} 

export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeStatus
}