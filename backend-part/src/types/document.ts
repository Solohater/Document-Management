export interface Document {
  id?: number
  title: string
  description: string
  fileUrl?: string
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  submitted_by: number
}