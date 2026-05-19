import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Building2, CheckCircle2, LogIn, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import getErrorMessage from "../utils/errorMessage.js";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell grid min-h-screen px-4 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
      <section className="flex items-center">
        <div className="max-w-2xl text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            <ShieldCheck size={17} />
            AI-enabled grievance redressal
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Resolve civic complaints with speed, clarity, and accountability.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/78">
            Register complaints, track progress, classify urgency with AI, and help departments respond with clear solution remarks.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["JWT secured access", "AI priority detection", "Department routing", "Admin solution tracking"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg bg-white/10 p-3 text-sm font-semibold backdrop-blur">
                <CheckCircle2 size={17} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid place-items-center">
        <div className="panel w-full max-w-md p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-white">
              <Building2 size={21} />
            </div>
            <div>
              <p className="eyebrow">CivicCare</p>
              <h2 className="text-2xl font-bold">Welcome back</h2>
            </div>
          </div>
          <p className="text-sm text-slate-500">Login to manage complaints, AI analysis, and resolution updates.</p>

          {error && <div className="mt-4 rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input className="field" id="email" name="email" type="email" placeholder="admin@test.com" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input className="field" id="password" name="password" type="password" placeholder="Enter password" value={form.password} onChange={handleChange} required />
            </div>
            <button className="btn-primary w-full" disabled={loading}>
              <LogIn size={18} />
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            New user? <Link className="font-bold text-mint" to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
