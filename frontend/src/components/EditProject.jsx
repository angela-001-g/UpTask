import useProjects from "../hooks/useProjects"
import FormProject from "./FormProject"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const EditProject = () => {

    const params = useParams()

    const { getProject, project, charging } = useProjects()
  
    useEffect(() => {
      getProject(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    const { name } = project

    if(charging) return 'Loading...'

  return (
    <>
        <h1 className='font-black text-4xl'>{name}</h1>

        <div className="mt-10 flex justify-center ">
            <FormProject />
        </div>
    </>
  )
}

export default EditProject
