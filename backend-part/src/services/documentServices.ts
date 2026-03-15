import type { Request } from "express"

import {
  insertDocument,
  fetchDocuments,
  getDocumentById,
  updateDocumentData,
  updateDocumentStatus
} from "../models/documentModel.js"


// Create document
export const createDocument = async (req: any) => {

  const { title, description } = req.body
  const userId = req.user.id

  const fileUrl = req.file
    ? `/uploads/${req.file.filename}`
    : undefined

  return await insertDocument(
    title,
    description,
    userId,
    fileUrl
  )
}


// Get all documents
export const getDocuments = async (req: Request) => {

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  return await fetchDocuments(page, limit)

}


// Get single document
export const getSingleDocument = async (req: Request) => {

  const id = Number(req.params.id)

  const doc = await getDocumentById(id)

  if (!doc) {
    throw new Error("Document not found")
  }

  return doc

}


// Update document
export const updateDocument = async (req: any) => {

  const id = Number(req.params.id)
  const { title, description } = req.body
  const userId = req.user.id

  const doc = await getDocumentById(id)

  if (!doc) {
    throw new Error("Document not found")
  }

  if (doc.submitted_by !== userId) {
    throw new Error("You can only edit your own document")
  }

  if (doc.status === "APPROVED") {
    throw new Error("Approved documents cannot be edited")
  }

  return await updateDocumentData(
    id,
    title,
    description
  )

}


// Approve document
export const approveDocument = async (req: Request) => {

  const id = Number(req.params.id)

  const doc = await getDocumentById(id)

  if (!doc) {
    throw new Error("Document not found")
  }

  if (doc.status === "APPROVED") {
    throw new Error("Document already approved")
  }

  return await updateDocumentStatus(
    id,
    "APPROVED"
  )

}


// Reject document
export const rejectDocument = async (req: Request) => {

  const id = Number(req.params.id)
  const { comment } = req.body

  const doc = await getDocumentById(id)

  if (!doc) {
    throw new Error("Document not found")
  }

  return await updateDocumentStatus(
    id,
    "REJECTED",
    comment
  )

}