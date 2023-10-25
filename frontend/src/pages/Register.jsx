import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = e => {
    e.preventDefault();

    if([name, email, password, repeatPassword].includes('')){
        setAlert({
          msg: 'All fields are required',
          error: true
        })

        return
    }
  }

  const { msg } = alert 

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Create your account and manage your {''}
          <span className="text-slate-700">projects</span>
      </h1>

      { msg && <Alert alert={alert} /> }

      <form
       className="my-10 bg-white shadow rounded-lg p-10"
       onSubmit={handleSubmit}
      >

        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >Name</label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Registration email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >Password</label>
          <input
            id="password"
            type="password"
            placeholder="Registration password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >Repeat password</label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          value="Create Account"
          className="bg-violet-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-800 transition-colors" 
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >Log In</Link>

      </nav>
    </>
  )
}

export default Register
