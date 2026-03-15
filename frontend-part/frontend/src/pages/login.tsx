import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {loginInput} from "../services/authServices"

const Login = () => {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (e:React.FormEvent) => {

    e.preventDefault()

    try{
      const user = await loginInput({ 
        email,
        password
      })
      

      if(user.role === "USER"){
        navigate("/my-documents")
      }else{
        navigate("/review")
      }

    }catch{
      alert("Login failed")
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-white p-8 w-80 rounded shadow">

        <h2 className="text-xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            className="w-full border p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="w-full border p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="w-full bg-black text-white p-2"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="underline ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login