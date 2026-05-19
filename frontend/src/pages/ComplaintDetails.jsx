import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bot, Save } from "lucide-react";
import api from "../api/axios.js";
import AiResult from "../components/AiResult.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import getErrorMessage from "../utils/errorMessage.js";

const ComplaintDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [resolutionNote, setResolutionNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComplaint = async () => {
    try {
      const { data } = await api.get(`/complaints/${id}`);
      setComplaint(data.complaint);
      setStatus(data.complaint.status);
      setResolutionNote(data.complaint.resolution?.note || "");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const updateStatus = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const payload = user?.role === "admin" ? { status, resolutionNote } : { status };
      const { data } = await api.put(`/complaints/${id}`, payload);
      setComplaint(data.complaint);
      setResolutionNote(data.complaint.resolution?.note || "");
      setMessage(user?.role === "admin" ? "Status and solution updated successfully." : "Status updated successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const runAi = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const { data } = await api.post(`/complaints/${id}/analyze`);
      setComplaint(data.complaint);
      setMessage("AI analysis completed.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (!complaint) {
    return <div className="panel p-5 text-sm text-slate-500">Loading complaint details...</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="panel p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">{complaint.title}</h2>
            <p className="text-sm text-slate-500">{complaint.location} | {complaint.category}</p>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        {message && <div className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{message}</div>}
        {error && <div className="mt-4 rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

        <dl className="mt-5 grid gap-4 text-sm">
          <div>
            <dt className="font-bold text-slate-700">Complainant</dt>
            <dd className="text-slate-600">{complaint.name} ({complaint.email})</dd>
          </div>
          <div>
            <dt className="font-bold text-slate-700">Description</dt>
            <dd className="mt-1 leading-6 text-slate-600">{complaint.description}</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-bold">Complaint Status Update Page</h3>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <select className="field" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
            <button type="button" onClick={updateStatus} disabled={loading} className="btn-primary">
              <Save size={17} />
              Update
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-bold">Admin Solution</h3>
          {user?.role === "admin" ? (
            <div className="mt-3 space-y-3">
              <textarea
                className="field min-h-28"
                value={resolutionNote}
                onChange={(event) => setResolutionNote(event.target.value)}
                placeholder="Write the action taken or solution provided to the user."
              />
              <p className="text-xs text-slate-500">Click Update above to save status and solution.</p>
            </div>
          ) : (
            <p className="mt-3 rounded-md bg-white p-3 text-sm leading-6 text-slate-600">
              {complaint.resolution?.note || "Admin has not added a solution yet."}
            </p>
          )}
          {complaint.resolution?.solvedAt && (
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Solved on {new Date(complaint.resolution.solvedAt).toLocaleString()}
            </p>
          )}
        </div>
      </section>

      <section className="panel p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">AI-Based Complaint Analysis</h2>
            <p className="text-sm text-slate-500">Detect urgency, suggest department, summarize complaint.</p>
          </div>
          <button type="button" onClick={runAi} disabled={loading} className="btn-primary">
            <Bot size={17} />
            Run AI
          </button>
        </div>
        <AiResult analysis={complaint.aiAnalysis} />
      </section>
    </div>
  );
};

export default ComplaintDetails;
