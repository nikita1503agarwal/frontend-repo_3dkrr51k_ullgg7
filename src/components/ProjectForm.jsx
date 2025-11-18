import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function ProjectForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", description: "", website: "", image: "", chain: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      await res.json();
      setForm({ name: "", description: "", website: "", image: "", chain: "" });
      onCreated?.();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input name="name" placeholder="Project name" value={form.name} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" required/>
        <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white"/>
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white"/>
        <input name="chain" placeholder="Chain (e.g., Ethereum)" value={form.chain} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white"/>
      </div>
      <textarea name="description" placeholder="Short description" value={form.description} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" rows={3}/>
      <button disabled={loading} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}
