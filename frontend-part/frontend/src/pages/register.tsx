import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerInput } from "../services/authServices";

const Register = () => {

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleRegister = async (e:React.FormEvent) => {

    e.preventDefault()

    try{
      await registerInput({
        name,
        email,
        password,
        role:"USER"
      })
      
      alert("Registration successful")

      navigate("/")

    }catch{
      alert("Registration failed")
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-white p-8 w-80 rounded shadow">

        <h2 className="text-xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            className="w-full border p-2"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="w-full border p-2"
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
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4 text-sm">

          Already have an account?

          <Link
            to="/"
            className="underline ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Register