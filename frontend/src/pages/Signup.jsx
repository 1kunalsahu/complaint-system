import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Building2, CheckCircle2, ShieldCheck, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import getErrorMessage from "../utils/errorMessage.js";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
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
      await signup(form);
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
            Secure citizen and admin access
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Create an account for smarter complaint tracking.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/78">
            Citizens can submit and track their own complaints. Admins can review all cases, update status, and add solution remarks.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Role-based access", "bcrypt password hashing", "MongoDB complaint records", "Render deployment ready"].map((item) => (
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
              <h2 className="text-2xl font-bold">Create account</h2>
            </div>
          </div>
          <p className="text-sm text-slate-500">Choose user for citizen access or admin for department operations.</p>

          {error && <div className="mt-4 rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input className="field" id="name" name="name" placeholder="Kunal Sahu" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input className="field" id="email" name="email" type="email" placeholder="kunal@test.com" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input className="field" id="password" name="password" type="password" minLength="6" placeholder="Minimum 6 characters" value={form.password} onChange={handleChange} required />
            </div>
            <div>
              <label className="label" htmlFor="role">Role</label>
              <select className="field" id="role" name="role" value={form.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="btn-primary w-full" disabled={loading}>
              <UserPlus size={18} />
              {loading ? "Creating..." : "Create Secure Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already registered? <Link className="font-bold text-mint" to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
