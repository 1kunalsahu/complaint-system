import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, Bot, FilePlus2, ListChecks, LogOut, MapPinned, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/complaints/new", label: "Register", icon: FilePlus2 },
  { to: "/complaints", label: "Complaints", icon: ListChecks },
  { to: "/ai-analyzer", label: "AI Analyzer", icon: Bot }
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-white shadow-sm">
              <ShieldCheck size={23} />
            </div>
            <div>
              <p className="eyebrow">CivicCare Portal</p>
              <h1 className="text-xl font-bold leading-tight">Smart Complaint Management</h1>
              <p className="flex items-center gap-1 text-sm text-slate-500">
                <MapPinned size={14} />
                AI-powered public grievance operations
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    isActive ? "bg-white text-mint shadow-sm" : "text-slate-600 hover:bg-white"
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-right">
              <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-mint">{user?.role}</p>
            </div>
            <button type="button" onClick={handleLogout} className="btn-secondary" title="Logout">
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
