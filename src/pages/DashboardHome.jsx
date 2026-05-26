import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Film, Zap, TrendingUp, Clock, ArrowRight } from "lucide-react";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.auth.me(),
      base44.entities.Reel.list("-created_date", 5),
    ]).then(([u, r]) => {
      setUser(u);
      setReels(r);
      setLoading(false);
    });
  }, []);

  const totalReels = reels.length;
  const completedReels = reels.filter((r) => r.status === "complete").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-white/10 border-t-[#C99A2E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="text-white/40 text-sm mt-1">Here's what's happening with your reels.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Reels", value: totalReels, icon: Film, color: "#C99A2E" },
          { label: "Completed", value: completedReels, icon: TrendingUp, color: "#22c55e" },
          { label: "This Session", value: reels.filter(r => {
            const d = new Date(r.created_date);
            const now = new Date();
            return now - d < 86400000;
          }).length, icon: Clock, color: "#60a5fa" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/40 text-sm">{label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick action */}
      <Link to="/generate">
        <div className="rounded-2xl p-6 border border-[#C99A2E]/30 cursor-pointer hover:border-[#C99A2E]/60 transition-all group" style={{ background: "rgba(201,154,46,0.06)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#C99A2E18" }}>
                <Zap className="w-6 h-6 text-[#C99A2E]" />
              </div>
              <div>
                <p className="text-white font-semibold">Generate a New Reel</p>
                <p className="text-white/40 text-sm mt-0.5">Paste a listing URL and Mia does the rest</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#C99A2E] transition-colors" />
          </div>
        </div>
      </Link>

      {/* Recent reels */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Recent Reels</h2>
          <Link to="/dashboard/reels" className="text-sm text-[#C99A2E] hover:underline">View all →</Link>
        </div>
        {reels.length === 0 ? (
          <div className="rounded-2xl border border-white/8 p-10 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
            <Film className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No reels yet — generate your first one!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {reels.map((reel) => (
              <div key={reel.id} className="flex items-center justify-between rounded-xl px-4 py-3 border border-white/6" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <Film className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <p className="text-sm text-white/70 truncate">{reel.listing_url}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ml-3 flex-shrink-0 ${
                  reel.status === "complete" ? "bg-green-500/15 text-green-400"
                  : reel.status === "failed" ? "bg-red-500/15 text-red-400"
                  : "bg-[#C99A2E]/15 text-[#C99A2E]"
                }`}>
                  {reel.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}