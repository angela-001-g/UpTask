import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useProjects from '../hooks/useProjects'

const Project = () => {

  const params = useParams()

  const { getProject, project, charging } = useProjects()

  useEffect(() => {
    getProject(params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { name } = project

  return (
    <>
      {charging ? '...' : (
          <div>
              <h1 className='font-black text-4xl'>{name}</h1>
          </div>
      )}

    </>

  )
}

export default Project
