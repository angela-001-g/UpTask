import Project from "../models/Project.js"
import Task from "../models/Task.js"
import mongoose from "mongoose";

const addTask = async(req, res) => {
    
    const { project } = req.body;


    try {
        const id = new mongoose.Types.ObjectId(project.trim());
        const projectExist = await Project.findById(id)
        if(!projectExist){
            const error = new Error('Project does not exist')
            return res.status(404).json({msg: error.message})
        }

        if(projectExist.creator.toString() !== req.user._id.toString()){
            const error = new Error('You dont have permissions to add tasks')
            return res.status(403).json({msg: error.message})
        }
   
        const storageTask = await Task.create({...req.body, project: new mongoose.Types.ObjectId(id)})
        // Almacenar ID en el proyecto
        projectExist.tasks.push(storageTask._id);
        await projectExist.save();
        res.json(storageTask);
             
    } catch (error) {
        console.log(error)
        return res.status(501).json({msg: 'Invalid Id'}) 
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
        const project = await Project.findById(task.project)
        project.tasks.pull(task._id)
        
        await Promise.allSettled([ await project.save(), await task.deleteOne() ])

        res.json({msg: "The task was deleted"})
    } catch (error) {
        console.log(error)
    }
} 

const changeStatus = async(req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id).populate("project")

    if(!task){
        const error = new Error('Task not found')
        return res.status(404).json({msg: error.message})
    }

    if(task.project.creator.toString() !== req.user._id.toString() && !task.project.collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString())){
        const error = new Error('Invalid Action')
        return res.status(403).json({msg: error.message})
    }

    task.status = !task.status
    task.complete = req.user._id
    await task.save()

    const storageTask = await Task.findById(id).populate("project").populate('complete')

    res.json(storageTask)
} 

export {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeStatus
}