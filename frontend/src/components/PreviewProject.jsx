/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProject = ({project}) => {

    const { auth } = useAuth()

    const {name, _id, customer, creator } = project

  return (
    <>
        <div className="border-b p-5 flex justify-between">
            <div className="flex items-center gap-2">
                <p className="flex-1">{name}
                    <span className="text-sm text-gray-500 uppercase">{' '}{customer}</span>
                </p>
                
                {auth._id !== creator && (
                    <p className="p-1 text-xs rounded-lg text-white bg-green-300 font-bold uppercase">Collaborator</p>
                )}
            </div>

            <Link
                to={`${_id}`}
                className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
            >View Project</Link>
        </div>
    </>
  )
}

export default PreviewProject
