import db from "../db.js"
import prisma from "../prisma/client.js"

// Insert new document
export const insertDocument = async (
  title: string,
  description: string,
  userId: number,
  fileUrl?: string
) => {

  const result = await prisma.documents.create({
    data: {
      title,
      description,
      submitted_by: userId,
      file_url: fileUrl
    }
  })

  return result

}


// Get all documents
export const fetchDocuments = async (//orm create a model that only showes our table and their types and use orm on another file for the sql
   page: number,
  limit: number
) => {
  const offset = (page - 1) * limit
  
  const result = await prisma.documents.findMany({
    orderBy: {
      created_at: "desc"
    },
    take: limit,
    skip: offset
  })

  return result

}


// Get single document
export const getDocumentById = async (id: number) => {

  const result = await prisma.documents.findUnique({
    where: {
      id
    }
  })

  return result

}


// Update document content
export const updateDocumentData = async (
  id: number,
  title: string,
  description: string
) => {

  const result =  await prisma.documents.update({
    where: {
      id
    },
    data: {
      title,
      description
    }
  })

  return result

}


// Update document status
export const updateDocumentStatus = async (
  id: number,
  status: string,
  comment?: string
) => {

  const result = await prisma.documents.update({
    where: {
      id
    },
    data: {
      status,
      reviewer_comment: comment ?? null
    }
  })

  return result

}