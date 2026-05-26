import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Film, Zap, Trash2, ExternalLink, Search } from "lucide-react";

export default function MyReels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    base44.entities.Reel.list("-created_date", 100).then((r) => {
      setReels(r);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await base44.entities.Reel.delete(id);
    setReels((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = reels.filter((r) =>
    r.listing_url?.toLowerCase().includes(search.toLowerCase()) ||
    r.property_address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Reels</h1>
          <p className="text-white/40 text-sm mt-1">{reels.length} reel{reels.length !== 1 ? "s" : ""} generated</p>
        </div>
        <Link to="/generate">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
            <Zap className="w-4 h-4" />
            New Reel
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search by URL or address…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:border-[#C99A2E]/40 transition-colors"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-white/10 border-t-[#C99A2E] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/8 p-14 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
          <Film className="w-10 h-10 text-white/15 mx-auto mb-4" />
          <p className="text-white/40 text-sm">{search ? "No reels match your search." : "No reels yet — generate your first one!"}</p>
          {!search && (
            <Link to="/generate">
              <button className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
                Generate Now
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((reel) => (
            <div key={reel.id} className="flex items-center gap-4 rounded-xl px-4 py-4 border border-white/6 hover:border-white/12 transition-all group" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,154,46,0.1)" }}>
                <Film className="w-5 h-5 text-[#C99A2E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{reel.property_address || reel.listing_url}</p>
                {reel.property_address && (
                  <p className="text-xs text-white/30 truncate mt-0.5">{reel.listing_url}</p>
                )}
                <p className="text-xs text-white/25 mt-0.5">{new Date(reel.created_date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full ${
                  reel.status === "complete" ? "bg-green-500/15 text-green-400"
                  : reel.status === "failed" ? "bg-red-500/15 text-red-400"
                  : "bg-[#C99A2E]/15 text-[#C99A2E]"
                }`}>
                  {reel.status}
                </span>
                {reel.video_url && (
                  <a href={reel.video_url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button onClick={() => handleDelete(reel.id)} className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}