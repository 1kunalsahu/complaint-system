import React from "react";
const statusClass = {
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-sky-100 text-sky-800",
  Resolved: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800"
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
