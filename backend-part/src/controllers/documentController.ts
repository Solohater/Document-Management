import type { Request, Response } from "express"

import {
  createDocument,
  getDocuments,
  getSingleDocument,
  updateDocument,
  approveDocument,
  rejectDocument
} from "../services/documentServices.js"


// Create Document
export const createDocumentController = async (req: any, res: Response) => {
  try {

    const document = await createDocument(req)

    res.json(document)

  } catch (error: any) {

    res.status(500).json({ message: error.message })

  }
}


// Get Documents
export const getDocumentsController = async (req: Request, res: Response) => {
  try {

    const docs = await getDocuments(req)

    res.json(docs)

  } catch (error: any) {

    res.status(500).json({ message: error.message })

  }
}


// Get Single Document
export const getDocumentByIdController = async (req: Request, res: Response) => {
  try {

    const doc = await getSingleDocument(req)

    res.json(doc)

  } catch (error: any) {

    res.status(500).json({ message: error.message })

  }
}


// Update Document
export const updateDocumentController = async (req: any, res: Response) => {
  try {

    const doc = await updateDocument(req)

    res.json(doc)

  } catch (error: any) {

    res.status(400).json({ message: error.message })

  }
}


// Approve Document
export const approveDocumentController = async (req: Request, res: Response) => {
  try {

    const doc = await approveDocument(req)

    res.json(doc)

  } catch (error: any) {

    res.status(500).json({ message: error.message })

  }
}


// Reject Document
export const rejectDocumentController = async (req: Request, res: Response) => {
  try {

    const doc = await rejectDocument(req)

    res.json(doc)

  } catch (error: any) {

    res.status(500).json({ message: error.message })

  }
}