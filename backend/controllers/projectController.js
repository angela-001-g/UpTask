import Project from "../models/Project.js"
import mongoose from "mongoose"

const getProjects = async(req, res) => {
    const projects = await Project.find().where('creator').equals(req.user)
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
    try {
        const id = new mongoose.Types.ObjectId(req.params.id.trim());
        const project = await Project.findById(id)
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        } 
    } catch (error) {
        return res.status(501).json({msg: 'Invalid Id'}) 
    }


}

const editProject = async(req, res) => {

}

const deleteProject = async(req, res) => {

}

const addCollaborator = async(req, res) => {

}

const deleteCollaborator = async(req, res) => {

}

const getTasks = async(req, res) => {

}

export { 
    getProjects, 
    newProject, 
    getProject, 
    editProject, 
    deleteProject, 
    addCollaborator, 
    deleteCollaborator, 
    getTasks 
}