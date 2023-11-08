/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from 'react-router-dom'

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({})
    const [charging, setCharging] = useState(false)
    const [modalFormTask, setModalFormTask] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return 
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/projects', config)
                setProjects(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        getProjects()
    }, [])

    const showAlert = alert => {
        setAlert(alert)

        setTimeout(() => {
            setAlert({})
        }, 5000)
    }

    const submitProject = async project => {
        
        if(project.id){
            await editProject(project)
        } else {
            await newProject(project)
        }

    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/projects/${project.id}`, project, config)
            
            // Sincronizar el state 
            const updateProjects = projects.map(projectSate => projectSate._id === data._id ? data : projectSate )
            setProjects(updateProjects)

            // Mostrar la alerta

            setAlert({
                msg: 'Project updated succesfully',
                error: false
            })

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 2000)


        } catch (error) {
            console.log(error)
        }
    }

    const newProject = async project => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/projects', project, config)

            setProjects([...projects, data])

            setAlert({
                msg: 'Project created succesfully',
                error: false
            })

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    }

    const getProject = async id => {
        setCharging(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const { data } = await clientAxios(`/projects/${id}`, config)
            setProject(data)

        } catch (error) {
            console.log(error)
        } finally {
            setCharging(false)
        }
    }

    const deleteProject = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/projects/${id}`, config)

            // Sincronizar el state
            const updatedProyects = projects.filter(projectState => projectState._id !== id)
            setProjects(updatedProyects)
            
            setAlert({
                msg: data.msg, 
                error: false
            })

            setTimeout(() => {
                setAlert({})
                navigate('/projects')
            }, 2000)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask)
    }

    const submitTask = async task => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/tasks`, task, config)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getProject,
                project, 
                charging,
                deleteProject,
                modalFormTask,
                handleModalTask,
                submitTask
            }}
        > {children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext