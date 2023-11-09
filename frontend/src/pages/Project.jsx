import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import useProjects from '../hooks/useProjects'
import ModalFormTask from '../components/ModalFormTask'
import ModalDeleteTask from '../components/ModalDeleteTask'
import Task from '../components/Task'
import Alert from '../components/Alert'

const Project = () => {

  const params = useParams()

  const { getProject, project, charging, handleModalTask, alert } = useProjects()


  useEffect(() => {
    getProject(params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { name } = project

  if(charging) return '...'

  const { msg } = alert

  return (
    <>
          <div className='flex justify-between'> 
              <h1 className='font-black text-4xl'>{name}</h1>
              <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>

                <Link
                  to={`/projects/edit/${params.id}`}
                  className='uppercase font-bold'
                >Edit</Link>

              </div>
          </div>

          <button
            onClick={handleModalTask}
            type='button'
            className='text-sm px-5 mt-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-violet-400 text-white text-center flex gap-2 items-center justify-center'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          New Task</button>

          <p className='font-bold text-xl mt-10'>Project Tasks</p>

          <div className='flex justify-center'>
            <div className=' w-full md:w-1/3 lg:w-1/4'>
              {msg && <Alert alert={alert} />}
            </div>
          </div>

          <div className='bg-white shadow mt-10 rounded-lg'>
            {project.tasks?.length ? 
              project.tasks?.map(task => (
                <Task
                  key={task._id}
                  task={task}
                /> 
              )):
              <p className='text-center my-5 p-10'>There are no tasks in this project</p>}
          </div>

          <div className='flex items-center justify-between mt-10'>
            <p className='font-bold text-xl '>Collaborators</p>
            <Link 
              to={`/projects/new-collaborator/${project._id}`}
              className='text-gray-400 hover:text-black uppercase font-bold '
            >Add</Link>
          </div>

          <ModalFormTask />
          <ModalDeleteTask />

    </>

  )
}

export default Project
