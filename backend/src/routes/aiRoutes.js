import express from "express";
import { body } from "express-validator";
import { analyzeComplaint } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/analyze",
  protect,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
    body("category").notEmpty().withMessage("Category is required"),
    body("location").notEmpty().withMessage("Location is required")
  ],
  validateRequest,
  analyzeComplaint
);

export default router;
