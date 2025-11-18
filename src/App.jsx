import Hero from "./components/Hero";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.10),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.10),transparent_35%)]" />
        <div className="relative">
          <header className="px-6 py-4 border-b border-white/5 backdrop-blur bg-slate-900/30">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400" />
                <span className="font-bold">Web3 Votes</span>
              </div>
              <div className="text-sm text-blue-300/80">Connect your wallet in the vote flow</div>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-6">
            <Hero />

            <section className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <h2 className="text-xl font-semibold mb-3">Add a project</h2>
                <ProjectForm onCreated={() => { /* no-op, list auto refresh handled outside if needed */ }} />
              </div>
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-3">Trending projects</h2>
                <ProjectList />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;