import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Alert from "../components/Alert"

const NewPassword = () => {

  const [password, setPassword] = useState('')
  const [validToken, setValidToken] = useState(false)
  const [alert, setAlert] = useState({})
  const [modifiedPassword, setModifiedPassword] = useState(false)

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

  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6){
      setAlert({
        msg: 'Password must be at least 6 characters',
        error: true
      })
      return 
    }

    try {
      const url = `http://localhost:4000/api/users/forgot-password/${token}`
      const { data } = await axios.post(url, { password })
      setAlert({
        msg: data.msg,
        error: false
      })
      setModifiedPassword(true)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Recover your password and dont lose acces to your {''}
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
              <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
              >
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
      
              <input 
                type="submit"
                value="Save new password"
                className="bg-violet-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-800 transition-colors" 
              />
      
            </form>
      )}
      {modifiedPassword && (
          <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/"
          >Log In</Link>
      )}
    </>
  )
}

export default NewPassword
