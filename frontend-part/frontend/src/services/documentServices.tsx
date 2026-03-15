import type { CreateDocumentPayload,Document } from "../types/document"
import { 
  createDocumentRequest, 
  fetchDocumentsRequest,
  fetchDocumentByIdRequest,
  updateDocumentRequest,
  approveDocumentrequest,
  rejectDocumentrequest,
getReviewQueueRequest } from "../api/documentsApi"

export const submitDocumentServices = async (
  payload: CreateDocumentPayload
) => {

  const formData = new FormData()

  formData.append("title", payload.title)
  formData.append("description", payload.description)

  if (payload.file) {
    formData.append("file", payload.file)
  }

  return await createDocumentRequest(formData)
}

export const getUserDocuments = async(
  page: number,
  limit: number,
  statusFilter: string,
  userId: number
) => {
  const docs = await fetchDocumentsRequest(page, limit)

  let myDocs = docs.filter(
    (doc:Document) => doc.submitted_by === userId
  )

   if (statusFilter !== "ALL") {
    myDocs = myDocs.filter(
      (doc: Document) => doc.status === statusFilter
    )
  }

  return {
    documents: myDocs,
    hasNextPage: docs.length === limit
  }
}

export const getDocument = async (id: string) => {
  return await fetchDocumentByIdRequest(id)
}

export const updateDocumentService = async (
  id: string,
  title: string,
  description: string
) => {

  return await updateDocumentRequest(id,title,description)

}

export const approveDocumentService = async (
  id: string,
  status: string
) => {

  if(status !== "SUBMITTED"){
    throw new Error("Document already reviewed")
  }

  return await approveDocumentrequest(id)

}

export const rejectDocumentService = async (
  id: string,
  status: string,
  comment: string
) => {

  if(status !== "SUBMITTED"){
    throw new Error("Document already reviewed")
  }

  return await rejectDocumentrequest(id,comment)

}

export const getReviewQueue = async (
  page: number,
  limit: number
) => {

  const documents = await getReviewQueueRequest(page,limit)

  const hasNextPage = documents.length === limit

  return {
    documents,
    hasNextPage
  }

}