export const DocumentStatuses = {
  SUBMITTED: "SUBMITTED",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type DocumentStatus =
  typeof DocumentStatuses[keyof typeof DocumentStatuses];

export interface Document {
  id: number;
  title: string;
  description: string;
  status: DocumentStatus;
  submitted_by: number;
  file_url?: string; 
}

export type CreateDocumentPayload = {
  title: string
  description: string
  file?: File
}

export type DocumentResponse = {
  message: string
  document: Document
}

export type UpdateDocumentStatusPayload = {
  status : DocumentStatus
}