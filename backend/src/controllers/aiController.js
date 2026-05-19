import { analyzeComplaintText } from "../services/openRouterService.js";

export const analyzeComplaint = async (req, res, next) => {
  try {
    const { title, description, category, location } = req.body;

    const analysis = await analyzeComplaintText({
      title,
      description,
      category,
      location
    });

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    next(error);
  }
};
