import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import { useParams } from "react-router-dom"
import Alert from "../components/Alert"

const NewCollaborator = () => {

  const { getProject, project, charging, collaborator, addCollaborator, alert } = useProjects()

  const params = useParams() 

  useEffect(() => {
    getProject(params.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(!project?._id) return <Alert alert={alert} />

  return (
    <>
        <h1 className="text-4xl font-black">Add Collaborator to project: {project.name}</h1>

        <div className="mt-10 flex justify-center">
            <FormCollaborator />
        </div>

        {charging ? <p className="text-center">Loading...</p> : collaborator._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">Result: </h2>
              <div className="flex justify-between items-center">
                <p>{collaborator.name}</p>
                <button
                  type="button"
                  onClick={() => addCollaborator({
                    email: collaborator.email
                  })}
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                >Add to project</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default NewCollaborator
