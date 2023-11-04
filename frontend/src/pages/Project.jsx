import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useProjects from '../hooks/useProjects'

const Project = () => {

  const params = useParams()

  const { getProject } = useProjects()

  useEffect(() => {
    getProject(params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      Project
    </div>
  )
}

export default Project
