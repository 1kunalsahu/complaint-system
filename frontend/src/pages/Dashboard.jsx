import React from "react";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock3, FilePlus2, ListChecks, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import getErrorMessage from "../utils/errorMessage.js";

const Dashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/complaints")
      .then(({ data }) => setComplaints(data.complaints))
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((item) => item.status === "Pending").length;
    const inProgress = complaints.filter((item) => item.status === "In Progress").length;
    const resolved = complaints.filter((item) => item.status === "Resolved").length;
    const high = complaints.filter((item) => ["High", "Critical"].includes(item.aiAnalysis?.urgency)).length;

    return [
      { label: "Total", value: total, icon: ListChecks, color: "bg-ink" },
      { label: "Pending", value: pending, icon: Clock3, color: "bg-amber-500" },
      { label: "In Progress", value: inProgress, icon: AlertTriangle, color: "bg-sky-500" },
      { label: "Resolved", value: resolved, icon: CheckCircle2, color: "bg-emerald-600" },
      { label: "High Priority", value: high, icon: AlertTriangle, color: "bg-coral" }
    ];
  }, [complaints]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-ink text-white shadow-soft">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_360px] lg:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint">Operations Dashboard</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              Welcome, {user?.name}. Monitor complaint flow and AI triage in one place.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72">
              {user?.role === "admin"
                ? "Admin view shows all submitted complaints, department routing, status progress, and solution remarks."
                : "User view shows only complaints submitted from your account, including admin solution updates."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/complaints/new" className="btn-primary bg-coral hover:bg-red-500">
                <FilePlus2 size={17} />
                Register Complaint
              </Link>
              <Link to="/ai-analyzer" className="btn-secondary border-white/25 bg-white/10 text-white hover:border-white hover:text-white">
                <Sparkles size={17} />
                Run AI Analysis
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-white/70">Current role</p>
            <p className="mt-2 text-4xl font-bold capitalize">{user?.role}</p>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Role-based JWT access keeps normal users from viewing every citizen complaint while allowing admins to resolve cases.
            </p>
          </div>
        </div>
      </section>

      {error && <div className="rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className={`mb-4 grid h-11 w-11 place-items-center rounded-md text-white ${color}`}>
              <Icon size={19} />
            </div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">
          <div>
            <h3 className="font-bold">Recent Complaints</h3>
            <p className="text-sm text-slate-500">Latest cases with status and AI department mapping.</p>
          </div>
          <Link to="/complaints" className="btn-secondary">View all</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {complaints.slice(0, 5).map((item) => (
            <div key={item._id} className="grid gap-2 p-4 md:grid-cols-[1fr_170px_130px] md:items-center">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-slate-500">{item.location} | {item.category}</p>
              </div>
              <p className="text-sm text-slate-600">{item.aiAnalysis?.department || "Not analyzed"}</p>
              <p className="text-sm font-bold text-slate-700">{item.status}</p>
            </div>
          ))}
          {!complaints.length && <p className="p-4 text-sm text-slate-500">No complaints found yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
