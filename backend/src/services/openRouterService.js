import axios from "axios";

const fallbackAnalysis = ({ title = "", description = "", category = "" }) => {
  const text = `${title} ${description} ${category}`.toLowerCase();

  let department = "General Administration Department";
  if (text.includes("water") || text.includes("pipeline") || text.includes("leak")) {
    department = "Water Supply Department";
  } else if (text.includes("electric") || text.includes("power") || text.includes("wire")) {
    department = "Electricity Department";
  } else if (text.includes("garbage") || text.includes("waste") || text.includes("drain")) {
    department = "Sanitation Department";
  } else if (text.includes("road") || text.includes("pothole") || text.includes("traffic")) {
    department = "Public Works Department";
  }

  let urgency = "Medium";
  if (text.includes("fire") || text.includes("accident") || text.includes("danger") || text.includes("shock")) {
    urgency = "Critical";
  } else if (text.includes("electric") || text.includes("sewage") || text.includes("blocked")) {
    urgency = "High";
  } else if (description.length < 50) {
    urgency = "Low";
  }

  return {
    urgency,
    department,
    summary: description.length > 140 ? `${description.slice(0, 137)}...` : description,
    response: `Your complaint has been received and forwarded to the ${department}. Current priority is ${urgency}.`
  };
};

const safeJsonParse = (content, complaint) => {
  try {
    const cleaned = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return fallbackAnalysis(complaint);
  }
};

export const analyzeComplaintText = async (complaint) => {
  if (!process.env.OPENROUTER_API_KEY) {
    return fallbackAnalysis(complaint);
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "system",
            content: "You analyze civic complaints. Return only valid JSON with keys urgency, department, summary, response. urgency must be Low, Medium, High, or Critical."
          },
          {
            role: "user",
            content: `Title: ${complaint.title}\nCategory: ${complaint.category}\nLocation: ${complaint.location}\nDescription: ${complaint.description}`
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173",
          "X-Title": "Smart Complaint Management System"
        },
        timeout: 20000
      }
    );

    const content = response.data?.choices?.[0]?.message?.content || "";
    const parsed = safeJsonParse(content, complaint);

    return {
      urgency: parsed.urgency || "Unknown",
      department: parsed.department || "General Administration Department",
      summary: parsed.summary || complaint.description,
      response: parsed.response || "Your complaint has been received."
    };
  } catch {
    return fallbackAnalysis(complaint);
  }
};
