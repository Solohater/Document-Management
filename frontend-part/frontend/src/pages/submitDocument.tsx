import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitDocumentServices } from "../services/documentServices";

const SubmitDocument = () => {

  const navigate = useNavigate()

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [file,setFile] = useState<File | null>(null)

  const submitDocument = async (e:React.FormEvent) => {

    e.preventDefault()

    try{
      await submitDocumentServices({
        title,
        description,
        file: file ?? undefined
      })

      alert("Document submitted successfully")

      navigate("/my-documents")

    }catch(err){
      console.log(err)
      alert("Error submitting document")
    }

  }

  return(

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Submit Document
        </h1>

        <form onSubmit={submitDocument} className="space-y-4">

          <input
            type="text"
            placeholder="Document Title"
            className="w-full border p-2"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />

          <input
            type="file"
            className="w-full"
            onChange={(e)=>{
              if(e.target.files){
                setFile(e.target.files[0])
              }
            }}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-2"
          >
            Submit Document
          </button>

        </form>

      </div>

    </div>

  )

}

export default SubmitDocument