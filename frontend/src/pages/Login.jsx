import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Log in and manage your {''}
        <span className="text-slate-700">projects</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
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
          />
        </div>

        <input 
          type="submit"
          value="Log In"
          className="bg-violet-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-800 transition-colors" 
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="register"
        >¿You dont have an account? Sign up!</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="forgot-password"
        >Forgot my password</Link>
      </nav>
    </>
  )
}

export default Login
