import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import { useParams } from "react-router-dom"

const NewCollaborator = () => {

  const { getProject, project, charging } = useProjects()

  const params = useParams() 

  useEffect(() => {
    getProject(params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(charging) return 'Loading... '

  return (
    <>
        <h1 className="text-4xl font-black">Add Collaborator to project: {project.name}</h1>

        <div className="mt-10 flex justify-center">
            <FormCollaborator />
        </div>
    </>
  )
}

export default NewCollaborator
