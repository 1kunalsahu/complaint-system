import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import api from "../api/axios.js";
import StatusBadge from "../components/StatusBadge.jsx";
import getErrorMessage from "../utils/errorMessage.js";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({ category: "", location: "", status: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/complaints", { params: filters });
      setComplaints(data.complaints);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this complaint?")) return;

    try {
      await api.delete(`/complaints/${id}`);
      setComplaints((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white/80 p-5 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
            <ClipboardList size={19} />
          </div>
          <div>
            <p className="eyebrow">Complaint Tracking</p>
            <h2 className="page-title mt-1">Complaint List Page</h2>
            <p className="mt-2 text-sm text-slate-500">Admins can view all complaints. Users can view only their own complaints.</p>
          </div>
        </div>
      </section>

      <section className="panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold">Filters</h3>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Category / Location / Status</span>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          <div>
            <label className="label" htmlFor="category">Category</label>
            <input className="field" id="category" name="category" value={filters.category} onChange={handleChange} placeholder="Water Supply" />
          </div>
          <div>
            <label className="label" htmlFor="location">Location</label>
            <input className="field" id="location" name="location" value={filters.location} onChange={handleChange} placeholder="Ghaziabad" />
          </div>
          <div>
            <label className="label" htmlFor="status">Status</label>
            <select className="field" id="status" name="status" value={filters.status} onChange={handleChange}>
              <option value="">All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </div>
          <button type="button" onClick={fetchComplaints} className="btn-primary">
            <Search size={17} />
            Search
          </button>
        </div>
      </section>

      {error && <div className="rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

      <section className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h3 className="font-bold">Complaints</h3>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
            <SlidersHorizontal size={16} />
            {loading ? "Loading..." : `${complaints.length} result(s)`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">AI Department</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complaints.map((item) => (
                <tr key={item._id} className="align-top">
                  <td className="px-4 py-3">
                    <Link to={`/complaints/${item._id}`} className="font-bold text-ink hover:text-mint">{item.title}</Link>
                    <p className="mt-1 text-xs text-slate-500">{item.email}</p>
                  </td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.location}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3">{item.aiAnalysis?.department || "Not analyzed"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link to={`/complaints/${item._id}`} className="btn-secondary">Open</Link>
                      <button type="button" onClick={() => handleDelete(item._id)} className="btn-secondary" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!complaints.length && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-500">No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Complaints;
