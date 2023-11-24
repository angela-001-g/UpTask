/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

let socket; 

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({})
    const [charging, setCharging] = useState(false)
    const [modalFormTask, setModalFormTask] = useState(false)
    const [task, setTask] = useState({})
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [collaborator, setCollaborator] = useState({})
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false)
    const [search, setSearch] = useState(false)


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

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
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
            setAlert({})
        } catch (error) {
            navigate('/projects')
            setAlert({
                msg: error.response.data.msg, 
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 2000)
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



    const submitTask = async task => {
        if(task?.id){
           await editTask(task) 
        } else {
           await createTask(task)
        }
    }


    const createTask = async task => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await clientAxios.post(`/tasks`, task, config)
            
            // Agregar la tarea al state

            const updateProject = {...project}
            updateProject.tasks = updateProject.tasks.map(taskState => taskState._id === data._id ? data : taskState )

            setProject(updateProject)
            setAlert({})
            setModalFormTask(false)

            // Socket.io 

            socket.emit('new task', data)

        } catch (error) {
            console.log(error)
        }
    }

    const editTask = async task => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config)


            const updateProject = {...project}
            updateProject.tasks = updateProject.tasks.map(taskState => taskState._id === data._id ? data : taskState )

            setProject(updateProject) 
            setAlert({})
            setModalFormTask(false)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask)
        setTask({})
    }

    const handleModalEditTask = task => {
        setTask(task)
        setModalFormTask(true)
    }

    const handleModalDeleteTask = task => {
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/tasks/${task._id}`, config)

            setAlert({
                msg: data.msg,
                error: false
            })


            const updateProject = {...project}
            updateProject.tasks = updateProject.tasks.filter(taskState => taskState._id !== task._id )

            setProject(updateProject)
            setModalDeleteTask(false)
            setTask({})
            setTimeout(() => {
                setAlert({})
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const submitCollaborator = async email => {
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

            const { data } = await clientAxios.post('/projects/collaborators', {email}, config)

            setCollaborator(data)
            setAlert({})

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCharging(false)
        }
    }

    const addCollaborator = async email => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/projects/collaborators/${project._id}`, email, config)

            setAlert({
                msg: data.msg,
                error: false
            })

            setCollaborator({})
            setTimeout(() => {
                setAlert({})
            }, 2000)

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const handleModalDeleteCollaborator = collaborator => {
        setModalDeleteCollaborator(!modalDeleteCollaborator)

        setCollaborator(collaborator)
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/projects/delete-collaborator/${project._id}`, {id: collaborator._id}, config)

            const updatedProject = {...project}

            updatedProject.collaborators = updatedProject.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id)

            setProject(updatedProject)

            setAlert({
                msg: data.msg, 
                error: false
            })

            setCollaborator({})
            setModalDeleteCollaborator(false)

            setTimeout(() => {
                setAlert({})
            }, 2000)

        } catch (error) {
            console.log(error.response)
        }
    }

    const completeTask = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post(`/tasks/status/${id}`, {}, config)

            const updatedProject = {...project}
            updatedProject.tasks = updatedProject.tasks.map(stateTask => stateTask._id === data._id ? data : stateTask)

            setProject(updatedProject)
            setTask({})
            setAlert({})

        } catch (error) {
            console.log(error.response)
        }
    }

    const handleSearch = () => {
        setSearch(!search)
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
                submitTask,
                handleModalEditTask,
                task,
                handleModalDeleteTask,
                modalDeleteTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator, 
                modalDeleteCollaborator,
                handleModalDeleteCollaborator,
                deleteCollaborator,
                completeTask,
                search,
                handleSearch
            }}
        > {children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext