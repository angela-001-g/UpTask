import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between ">
                <h2 className="text-4xl text-violet-600 font-black text-center ">UpTask</h2>
                <input 
                    type="search"
                    placeholder="Search Project"
                    className="rounded-lg lg:w-96 block p-2 border "
                />

                <div className="flex item-center gap-4" >
                    <Link
                        to="/projects"
                        className="flex items-center font-bold uppercase"
                    >Projects</Link>
                    <button
                        type="button"
                        className="text-white text-sm bg-violet-600 p-3 rounded-md uppercase font-bold"
                    >
                        Sign Off
                    </button>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header
