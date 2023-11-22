import { Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import Search from "./Search"

const Header = () => {

    const { handleSearch } = useProjects()

  return (
    <>
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between ">
                <h2 className="text-4xl text-violet-600 font-black text-center mb-5 md:mb-0 ">UpTask</h2>

                <div className="flex flex-col md:flex-row item-center gap-4" >
                    <button
                        className="font-bold uppercase"
                        type="button"
                        onClick={handleSearch}
                    >Search Project</button>
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
                    <Search />
                </div>
            </div>
        </header>
    </>
  )
}

export default Header
