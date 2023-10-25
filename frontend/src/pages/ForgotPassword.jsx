import { Link } from "react-router-dom"

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Recover your access and dont lose your {''}
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

        <input 
          type="submit"
          value="Send instructions"
          className="bg-violet-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-800 transition-colors" 
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >Log In</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >¿You dont have an account? Sign up!</Link>
      </nav>
    </>
  )
}

export default ForgotPassword
