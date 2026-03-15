import API from "./api";
import type { Document, } from "../types/document";

export const createDocumentRequest = async(formData: FormData) => {
  const response = await API.post("/documents", formData)
  return response.data
}

export const fetchDocumentsRequest = async (
  page: number,
  limit: number
): Promise<Document[]> => {

  const res = await API.get<Document[]>(
    `/documents?page=${page}&limit=${limit}`
  )

  return res.data
}

export const fetchDocumentByIdRequest = async (id: string): Promise<Document> => {

  const res = await API.get<Document>(`/documents/${id}`)
  return res.data

}

export const updateDocumentRequest = async (
  id: string,
  title: string,
  description: string
) => {

  const res = await API.put(`/documents/${id}`,{
    title,
    description
  })

  return res.data
}

export const approveDocumentrequest = async (id: string) => {

  const res = await API.put(`/documents/${id}/approve`)
  return res.data

}

export const rejectDocumentrequest = async (
  id: string,
  comment: string
) => {

  const res = await API.put(`/documents/${id}/reject`,{
    comment
  })

  return res.data

}

export const getReviewQueueRequest = async (
  page: number,
  limit: number
): Promise<Document[]> => {

  const res = await API.get<Document[]>(
    `/documents?page=${page}&limit=${limit}`
  )

  return res.data
}

