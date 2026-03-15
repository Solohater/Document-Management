import { Router } from "express"
import upload from "../middleware/uploade.js"

import {
  createDocumentController,
  getDocumentsController,
  getDocumentByIdController,   // ADD THIS
  updateDocumentController,
  approveDocumentController,
  rejectDocumentController
} from "../controllers/documentController.js"

import { authenticate } from "../middleware/authMiddleware.js"
import { requireRole } from "../middleware/roleMiddleware.js"

const router = Router()

// USER: submit document
router.post(
  "/",
  authenticate,
  upload.single("file"),
  createDocumentController
)

// USER: view all documents
router.get(
  "/",
  authenticate,
  getDocumentsController
)

// NEW: get single document
router.get(
  "/:id",
  authenticate,
  getDocumentByIdController
)

// USER: edit document
router.put(
  "/:id",
  authenticate,
  updateDocumentController
)

// REVIEWER: approve document
router.put(
  "/:id/approve",
  authenticate,
  requireRole("REVIEWER"),
  approveDocumentController
)

// REVIEWER: reject document
router.put(
  "/:id/reject",
  authenticate,
  requireRole("REVIEWER"),
  rejectDocumentController
)

export default router