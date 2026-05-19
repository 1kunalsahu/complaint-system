import express from "express";
import { body } from "express-validator";
import {
  addComplaint,
  analyzeExistingComplaint,
  deleteComplaint,
  getComplaintById,
  getComplaints,
  searchByLocation,
  updateComplaintStatus
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

const complaintValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("title").notEmpty().withMessage("Complaint title is required"),
  body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
  body("category").notEmpty().withMessage("Category is required"),
  body("location").notEmpty().withMessage("Location is required")
];

router.route("/")
  .post(protect, complaintValidation, validateRequest, addComplaint)
  .get(protect, getComplaints);

router.get("/search", protect, searchByLocation);
router.get("/:id", protect, getComplaintById);
router.put(
  "/:id",
  protect,
  body("status").optional().isIn(["Pending", "In Progress", "Resolved", "Rejected"]).withMessage("Invalid status value"),
  body("resolutionNote").optional().isString().withMessage("Solution note must be text"),
  validateRequest,
  updateComplaintStatus
);
router.delete("/:id", protect, deleteComplaint);
router.post("/:id/analyze", protect, analyzeExistingComplaint);

export default router;
