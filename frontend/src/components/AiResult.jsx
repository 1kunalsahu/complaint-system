import React from "react";
import { Building2, Gauge, MessageSquareText, ScrollText } from "lucide-react";

const items = [
  { key: "urgency", label: "Priority", icon: Gauge },
  { key: "department", label: "Department", icon: Building2 },
  { key: "summary", label: "Summary", icon: ScrollText },
  { key: "response", label: "Auto Response", icon: MessageSquareText }
];

const AiResult = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(({ key, label, icon: Icon }) => (
        <div key={key} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
            <Icon size={18} className="text-mint" />
            {label}
          </div>
          <p className="text-sm leading-6 text-slate-700">{analysis[key] || "Not available"}</p>
        </div>
      ))}
    </div>
  );
};

export default AiResult;
