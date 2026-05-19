import Complaint from "../models/Complaint.js";
import { analyzeComplaintText } from "../services/openRouterService.js";

export const addComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.create({
      ...req.body,
      user: req.user?._id
    });

    res.status(201).json({
      success: true,
      message: "Complaint stored successfully",
      complaint
    });
  } catch (error) {
    next(error);
  }
};

export const getComplaints = async (req, res, next) => {
  try {
    const { category, status, location } = req.query;
    const filter = req.user?.role === "admin" ? {} : { user: req.user._id };

    if (category) filter.category = new RegExp(category, "i");
    if (status) filter.status = status;
    if (location) filter.location = new RegExp(location, "i");

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    next(error);
  }
};

export const getComplaintById = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user?.role !== "admin") filter.user = req.user._id;

    const complaint = await Complaint.findOne(filter);

    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found.");
    }

    res.json({ success: true, complaint });
  } catch (error) {
    next(error);
  }
};

export const updateComplaintStatus = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user?.role !== "admin") filter.user = req.user._id;

    const complaint = await Complaint.findOne(filter);

    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found.");
    }

    complaint.status = req.body.status || complaint.status;

    if (req.body.resolutionNote !== undefined) {
      if (req.user.role !== "admin") {
        res.status(403);
        throw new Error("Only admin can add or edit solution remarks.");
      }

      complaint.resolution.note = req.body.resolutionNote;
      complaint.resolution.solvedBy = req.user._id;
      complaint.resolution.solvedAt = req.body.status === "Resolved" ? new Date() : complaint.resolution.solvedAt;
    }

    await complaint.save();

    res.json({
      success: true,
      message: "Complaint status updated successfully",
      complaint
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComplaint = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user?.role !== "admin") filter.user = req.user._id;

    const complaint = await Complaint.findOne(filter);

    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found.");
    }

    await complaint.deleteOne();

    res.json({
      success: true,
      message: "Complaint removed successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const searchByLocation = async (req, res, next) => {
  try {
    const { location } = req.query;

    if (!location) {
      res.status(400);
      throw new Error("Location query parameter is required.");
    }

    const filter = {
      location: new RegExp(location, "i")
    };
    if (req.user?.role !== "admin") filter.user = req.user._id;

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeExistingComplaint = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user?.role !== "admin") filter.user = req.user._id;

    const complaint = await Complaint.findOne(filter);

    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found.");
    }

    const aiAnalysis = await analyzeComplaintText(complaint);
    complaint.aiAnalysis = aiAnalysis;
    await complaint.save();

    res.json({
      success: true,
      message: "AI analysis completed",
      complaint
    });
  } catch (error) {
    next(error);
  }
};
