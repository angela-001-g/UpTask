import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Alert from "../components/Alert"

const NewPassword = () => {

  const [validToken, setValidToken] = useState(false)
  const [alert, setAlert] = useState({})

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const checkToken = async () => {
        try {
          // TODO: Mover hacia un cliente axios
          await axios(`http://localhost:4000/api/users/forgot-password/${token}`)
          setValidToken(true)          

        } catch (error) {
          setAlert({
            msg: error.response.data.msg, 
            error: true
          })
        }
    }
    checkToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { msg } = alert

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Recover your password and dont lose acces to your {''}
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
              <form className="my-10 bg-white shadow rounded-lg p-10">
              <div className="my-5">
                  <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                  >New Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Write your new password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  />
                </div>
      
              <input 
                type="submit"
                value="Save new password"
                className="bg-violet-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-800 transition-colors" 
              />
      
            </form>
      )}
    </>
  )
}

export default NewPassword
