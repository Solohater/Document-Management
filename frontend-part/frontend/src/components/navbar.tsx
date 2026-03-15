import { Link, useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const role = localStorage.getItem("role")?.toUpperCase()

  const logout = () => {

    localStorage.clear()
    navigate("/")

  }

  return(

    <div className="flex justify-between items-center bg-black text-white p-4">

      <h1 className="font-bold text-lg">
        Document Workflow
      </h1>

      <div className="flex items-center gap-6">

        {/* USER NAVIGATION */}

        {role === "USER" && (
          <>
          {location.pathname !== "/my-documents" && (
            <Link
              to="/my-documents"
              className="hover:underline"
            >
              My Documents
            </Link>)}

           {location.pathname !== "/submit" && (  
            <Link
              to="/submit"
              className="hover:underline"
            >
              Submit Document
            </Link>)}
          </>
        )}

        {/* REVIEWER NAVIGATION */}

        {role === "REVIEWER" && location.pathname !== "/review" && (
            <Link
              to="/review"
              className="hover:underline"
            >
              Review Queue
            </Link>
          )}

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="bg-white text-black px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>

  )

}

export default Navbar