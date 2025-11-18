import { useEffect, useMemo, useState } from "react";
import { ThumbsUp } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "";

async function getNonce(address) {
  const res = await fetch(`${API}/api/nonce?address=${address}`, { method: "POST" });
  return res.json();
}

async function listProjects() {
  const res = await fetch(`${API}/api/projects`);
  return res.json();
}

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await listProjects();
      setProjects(data);
    } catch (e) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  // Demo wallet connection (window.ethereum)
  const connect = async () => {
    if (!window.ethereum) {
      alert("No wallet found. Please install MetaMask.");
      return null;
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  };

  const personalSign = async (address, message) => {
    const from = address;
    const sign = await window.ethereum.request({
      method: "personal_sign",
      params: [message, from]
    });
    return sign;
  };

  const vote = async (projectId) => {
    try {
      const address = await connect();
      if (!address) return;

      const { nonce } = await getNonce(address);
      const message = `VOTE:${projectId}:${nonce}`;
      const signature = await personalSign(address, message);

      const res = await fetch(`${API}/api/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, address, signature, nonce })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Vote failed");
      await refresh();
      alert("Vote recorded!");
    } catch (e) {
      alert(e.message);
    }
  };

  const sorted = useMemo(() => {
    return [...projects].sort((a, b) => b.votes - a.votes);
  }, [projects]);

  if (loading) return <div className="text-blue-200">Loading projects...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((p) => (
        <div key={p.id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl overflow-hidden">
          {p.image && <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">{p.name}</h3>
              <span className="text-blue-300 text-sm">{p.chain || ""}</span>
            </div>
            <p className="mt-2 text-blue-200/80 text-sm line-clamp-3">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <a href={p.website || "#"} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Visit ↗</a>
              <button onClick={() => vote(p.id)} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition">
                <ThumbsUp size={18}/> Vote <span className="px-2 py-0.5 bg-blue-500/40 rounded text-xs">{p.votes}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
