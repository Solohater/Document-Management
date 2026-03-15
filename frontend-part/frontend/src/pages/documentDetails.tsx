import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


import type { Document } from "../types/document"

import {
  getDocument,
  updateDocumentService,
  approveDocumentService,
  rejectDocumentService
} from "../services/documentServices"

const DocumentDetails = () => {

  const { id } = useParams()
 

  const [doc,setDoc] = useState<Document | null>(null)
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [comment,setComment] = useState("")

  const role = localStorage.getItem("role")
  const userId = Number(localStorage.getItem("userId"))

  useEffect(()=>{
    fetchDoc()
  },[])

   const fetchDoc = async () => {

    if(!id) return

    try{

      const data = await getDocument(id)

      setDoc(data)
      setTitle(data.title)
      setDescription(data.description)

    }catch(err){
      console.log(err)
    }

  }
  const updateDocument = async () => {

    if(!id) return

    try{

      await updateDocumentService(id,title,description)

      alert("Document updated")

      fetchDoc()

    }catch{
      alert("Update failed")
    }

  }

  const approveDocument = async () => {

    if(!id || !doc) return

    try{

      await approveDocumentService(id,doc.status)

      alert("Document Approved")

      fetchDoc()

    }catch(err:any){
      alert(err.message)
    }

  }


  const rejectDocument = async () => {

   if(!id || !doc) return

    try{

      await rejectDocumentService(id,doc.status,comment)

      alert("Document Rejected")

      fetchDoc()

    }catch(err:any){
      alert(err.message)
    }

  }


  if(!doc) return <p className="p-10">Loading...</p>

  const isOwner = doc.submitted_by === userId
  const editable = doc.status === "SUBMITTED"

  const fileName = doc.file_url?.split("/").pop()

  return(

    <div className="p-10 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Document Details
      </h1>

      {/* TITLE */}

      <div className="mb-4">
        <label className="block font-semibold mb-1">Title</label>

        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          disabled={!editable || role === "REVIEWER"}
        />
      </div>

      {/* DESCRIPTION */}

      <div className="mb-4">
        <label className="block font-semibold mb-1">Description</label>

        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          disabled={!editable || role === "REVIEWER"}
        />
      </div>

      {/* DOCUMENT FILE */}

      {doc.file_url && (

        <div className="mb-4">

          <label className="block font-semibold mb-1">
            Document
          </label>

          <a
            href={`http://localhost:5000${encodeURI(doc.file_url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {fileName}
          </a>

        </div>

      )}

      <p className="mb-6">
        <strong>Status:</strong> {doc.status}
      </p>

      {role === "USER" && isOwner && editable && (

        <button
          onClick={updateDocument}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Update Document
        </button>

      )}

      {role === "REVIEWER" && doc.status === "SUBMITTED" && (

        <div className="mt-6">

          <textarea
            placeholder="Rejection comment"
            className="border p-2 w-full mb-4"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />

          <div className="flex gap-4">

            <button
              onClick={approveDocument}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve
            </button>

            <button
              onClick={rejectDocument}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>

          </div>

        </div>

      )}

      {role === "REVIEWER" && doc.status !== "SUBMITTED" && (

        <p className="text-gray-500 mt-6">
          This document has already been reviewed.
        </p>

      )}

    </div>

  )

}

export default DocumentDetails