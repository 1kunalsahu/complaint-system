import React from "react";
import { useState } from "react";
import { Bot } from "lucide-react";
import api from "../api/axios.js";
import AiResult from "../components/AiResult.jsx";
import getErrorMessage from "../utils/errorMessage.js";

const AiAnalyzer = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Electricity",
    location: ""
  });
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const { data } = await api.post("/ai/analyze", form);
      setAnalysis(data.analysis);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="panel p-5">
        <h2 className="text-2xl font-bold">AI Complaint Analyzer</h2>
        <p className="text-sm text-slate-500">Test priority detection and department recommendation directly.</p>

        {error && <div className="mt-4 rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="label" htmlFor="title">Title</label>
            <input className="field" id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label className="label" htmlFor="description">Description</label>
            <textarea className="field min-h-36" id="description" name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="category">Category</label>
              <input className="field" id="category" name="category" value={form.category} onChange={handleChange} required />
            </div>
            <div>
              <label className="label" htmlFor="location">Location</label>
              <input className="field" id="location" name="location" value={form.location} onChange={handleChange} required />
            </div>
          </div>
          <button className="btn-primary" disabled={loading}>
            <Bot size={17} />
            {loading ? "Analyzing..." : "Analyze Complaint"}
          </button>
        </form>
      </section>

      <section className="panel p-5">
        <h2 className="text-2xl font-bold">Analysis Output</h2>
        <p className="mb-5 text-sm text-slate-500">Use this screen for AI integration screenshots.</p>
        <AiResult analysis={analysis} />
        {!analysis && <p className="rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-500">AI output appears here after analysis.</p>}
      </section>
    </div>
  );
};

export default AiAnalyzer;
