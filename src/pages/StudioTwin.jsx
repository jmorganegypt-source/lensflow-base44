import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Loader2 } from "lucide-react";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/da745320e_logo-lensflow-mark.png";

const TWINS = [
  {
    name: "Mia",
    accent: "Australian-British",
    role: "Luxury Residential Specialist",
    bio: "Warm, elegant, and sophisticated. Perfect for prestige properties and beachfront estates.",
    img: "https://luxury-video-studio-1.emergent.host/assets/property/mia-headshot.jpg",
    color: "from-rose-500 to-amber-500",
  },
  {
    name: "Oliver",
    accent: "British RP",
    role: "Commercial Authority",
    bio: "Refined baritone with quiet confidence. Built for commercial, off-the-plan and investment properties.",
    img: "https://luxury-video-studio-1.emergent.host/assets/property/oliver-portrait.jpg",
    color: "from-blue-600 to-slate-700",
  },
];

export default function StudioTwin() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBeginSession = async () => {
    if (!selected) return;
    setLoading(true);
    // For now, just route to /generate with selected twin info
    // In future, this could start a live session or stream
    setTimeout(() => {
      window.location.href = "/generate";
    }, 800);
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Choose Your <span style={{ color: "#C99A2E" }}>AI Presenter</span>
        </h1>
        <p className="text-lg text-[#0F1A2E]/60 max-w-2xl mx-auto">
          Each digital twin has a unique voice, style, and personality. Pick the one that matches your property best.
        </p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {TWINS.map((twin) => (
            <div
              key={twin.name}
              onClick={() => setSelected(twin.name)}
              className={`flex flex-col md:flex-row gap-6 p-8 rounded-2xl border-2 cursor-pointer transition-all ${
                selected === twin.name
                  ? "border-[#C99A2E] bg-white shadow-lg"
                  : "border-[#0F1A2E]/10 bg-white/40 hover:border-[#0F1A2E]/20"
              }`}
            >
              <div className="md:w-48 flex-shrink-0">
                <img
                  src={twin.img}
                  alt={twin.name}
                  className="w-full h-48 md:h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#0F1A2E]/40 mb-1">
                    {twin.accent}
                  </p>
                  <h2 className="text-3xl font-bold text-[#0F1A2E]">{twin.name}</h2>
                  <p className="text-sm font-medium" style={{ color: "#C99A2E" }}>
                    {twin.role}
                  </p>
                </div>
                <p className="text-[#0F1A2E]/60 leading-relaxed">{twin.bio}</p>
                <div>
                  {selected === twin.name && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <button
            onClick={handleBeginSession}
            disabled={!selected || loading}
            className="w-full h-12 rounded-full bg-[#0F1A2E] hover:bg-[#1A2944] text-white font-semibold disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Starting session...
              </>
            ) : (
              <>
                Begin Session <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}