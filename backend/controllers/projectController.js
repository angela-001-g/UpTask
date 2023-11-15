import Project from "../models/Project.js"
import User from "../models/User.js"
import mongoose from "mongoose"

const getProjects = async(req, res) => {
    const projects = await Project.find().where('creator').equals(req.user).select('-tasks')
    res.json(projects)
}

const newProject = async(req, res) => {
    const project = new Project(req.body)
    project.creator = req.user._id

    try {
        const storedProject = await project.save()
        res.json(storedProject);
    } catch (error) {
        console.log(error)
    }
}

const getProject = async(req, res) => {
    let project; 
    try {
        const id = new mongoose.Types.ObjectId(req.params.id.trim());
        project = await Project.findById(id).populate('tasks')
        if(!project){
            const error = new Error('Project not found')
            return res.status(404).json({msg: error.message})
        } 
    } catch (error) {
        return res.status(501).json({msg: 'Invalid Id'}) 
    }
    if(project.creator.toString() !== req.user._id.toString()){
        const error = new Error("Invalid Action")
        return res.status(401).json({msg: error.message})
    }
    res.json(project)
}

const editProject = async(req, res) => {

    let project; 
    try {
        const id = new mongoose.Types.ObjectId(req.params.id.trim());
        project = await Project.findById(id)
        if(!project){
            const error = new Error('Project not found')
            return res.status(404).json({msg: error.message})
        } 
    } catch (error) {
        return res.status(501).json({msg: 'Invalid Id'}) 
    }
    if(project.creator.toString() !== req.user._id.toString()){
        const error = new Error("Invalid Action")
        return res.status(401).json({msg: error.message})
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deadline = req.body.deadline || project.deadline;
    project.customer = req.body.customer || project.cuastomer;

    try {
        const storageProject = await project.save()
        res.json(storageProject)
    } catch (error) {
        console.log(error)
    }
}

const deleteProject = async(req, res) => {

    let project; 
    try {
        const id = new mongoose.Types.ObjectId(req.params.id.trim());
        project = await Project.findById(id)
        if(!project){
            const error = new Error('Project not found')
            return res.status(404).json({msg: error.message})
        } 
    } catch (error) {
        return res.status(501).json({msg: 'Invalid Id'}) 
    }
    if(project.creator.toString() !== req.user._id.toString()){
        const error = new Error("Invalid Action")
        return res.status(401).json({msg: error.message})
    }

    try {
        await project.deleteOne();
        res.json({msg: "Project deleted"})
    } catch (error) {
        console.log(error)
    }

}

const searchCollaborator = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({email})
        if(!user){
            const error = new Error('User not found')
            return res.status(404).json({msg: error.message})
        }
    
        res.json(user)
    } catch (error) {
        console.log('Error in addCollaborator')
    }
}

const addCollaborator = async(req, res) => {

}

const deleteCollaborator = async(req, res) => {

}


export { 
    getProjects, 
    newProject, 
    getProject, 
    editProject, 
    deleteProject, 
    addCollaborator, 
    deleteCollaborator, 
    searchCollaborator
}