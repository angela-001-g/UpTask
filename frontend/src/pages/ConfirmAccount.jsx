import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Alert from "../components/Alert.jsx"

const ConfirmAccount = () => {

  const[alert, setAlert] = useState({})
  const[confirmAccount, setConfirmAccount] = useState(false)

  const params = useParams();
  const { id } = params; 

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `http://localhost:4000/api/users/confirm/${id}`
        const { data } = await axios(url)

        setAlert({
          msg: data.msg,
          error: false
        })

        setConfirmAccount(true)

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount()
  }, [id])

  const { msg } = alert

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Confirm your account and start creating your {''}
        <span className="text-slate-700">projects</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {confirmAccount && (
            <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
            >Log In</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount
