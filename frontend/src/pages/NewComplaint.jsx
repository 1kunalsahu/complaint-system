import React from "react";
import { useState } from "react";
import { Bot, FileText, Save, Sparkles } from "lucide-react";
import api from "../api/axios.js";
import AiResult from "../components/AiResult.jsx";
import getErrorMessage from "../utils/errorMessage.js";

const initialForm = {
  name: "",
  email: "",
  title: "",
  description: "",
  category: "Water Supply",
  location: "",
  status: "Pending"
};

const categories = ["Water Supply", "Electricity", "Sanitation", "Road", "Health", "Other"];

const NewComplaint = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const analyzeDraft = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/ai/analyze", form);
      setAnalysis(data.analysis);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/complaints", form);
      if (analysis) {
        await api.post(`/complaints/${data.complaint._id}/analyze`);
      }
      setMessage("Complaint submitted successfully.");
      setForm(initialForm);
      setAnalysis(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white/80 p-5 shadow-soft">
        <p className="eyebrow">Complaint Intake</p>
        <h2 className="page-title mt-2">Register a civic issue</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Submit the complaint details once. The system stores it securely and can use AI to estimate urgency, department, summary, and response.
        </p>
      </section>

    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="panel p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
            <FileText size={19} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Complaint Registration Form</h2>
            <p className="text-sm text-slate-500">Submit civic issues with category, location, and status.</p>
          </div>
        </div>

        {message && <div className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{message}</div>}
        {error && <div className="mt-4 rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input className="field" id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input className="field" id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="title">Complaint Title</label>
            <input className="field" id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="description">Complaint Description</label>
            <textarea className="field min-h-32" id="description" name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div>
            <label className="label" htmlFor="category">Complaint Category</label>
            <select className="field" id="category" name="category" value={form.category} onChange={handleChange}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="location">Location</label>
            <input className="field" id="location" name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div>
            <label className="label" htmlFor="status">Complaint Status</label>
            <select className="field" id="status" name="status" value={form.status} onChange={handleChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button type="button" onClick={analyzeDraft} className="btn-secondary" disabled={loading}>
              <Bot size={17} />
              Analyze
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={17} />
              Submit
            </button>
          </div>
        </form>
      </section>

      <section className="panel p-5">
        <div className="mb-5 flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-mint text-white">
            <Sparkles size={19} />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Analysis Result Display</h2>
            <p className="text-sm text-slate-500">Priority detection, department, summary, and response.</p>
          </div>
        </div>
        <AiResult analysis={analysis} />
        {!analysis && <p className="rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-500">Fill the form and click Analyze to preview AI output.</p>}
      </section>
    </div>
    </div>
  );
};

export default NewComplaint;
