import { useState } from "react"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"

const FormProject = () => {

    const[name, setName] = useState('')
    const[description, setDescription] = useState('')
    const[deadline, setDeadline] = useState('')
    const[customer, setCustomer] = useState('')

    const { showAlert, alert, submitProject } = useProjects()

    const handleSubmit = e => {
        e.preventDefault()

        if([name, description, deadline, customer].includes('')){
            showAlert({
                msg: 'All fields are required',
                error: true
            })
            return
        }

        // Pasar datos hacia el provider 
        submitProject({name, description, deadline, customer})
    }

    const { msg } = alert
    
  return (
    <>
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alert alert={alert}/>}

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="name"
                >
                    Project Name
                </label>
                
                <input 
                    id="name"
                    type="text" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Project Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="description"
                >
                    Description
                </label>
                
                <textarea 
                    id="description"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Project Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="deadline"
                >
                    Deadline
                </label>
                
                <input 
                    id="deadline"
                    type="date" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="customer"
                >
                    Customer Name
                </label>
                
                <input 
                    id="customer"
                    type="text" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Customer Name"
                    value={customer}
                    onChange={e => setCustomer(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value="Create Project"
                className="bg-violet-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-violet-700 transition-colors"
            />
        </form>
    </>
  )
}

export default FormProject
