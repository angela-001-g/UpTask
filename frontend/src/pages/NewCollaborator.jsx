import FormCollaborator from "../components/FormCollaborator"

const NewCollaborator = () => {
  return (
    <>
        <h1 className="text-4xl font-black">Add Collaborator</h1>

        <div className="mt-10 flex justify-center">
            <FormCollaborator />
        </div>
    </>
  )
}

export default NewCollaborator
