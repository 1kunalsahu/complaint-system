import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    title: {
      type: String,
      required: [true, "Complaint title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Complaint description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"]
    },
    category: {
      type: String,
      required: [true, "Complaint category is required"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending"
    },
    aiAnalysis: {
      urgency: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical", "Unknown"],
        default: "Unknown"
      },
      department: {
        type: String,
        default: "Not analyzed"
      },
      summary: {
        type: String,
        default: ""
      },
      response: {
        type: String,
        default: ""
      }
    },
    resolution: {
      note: {
        type: String,
        default: ""
      },
      solvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      solvedAt: {
        type: Date
      }
    }
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
