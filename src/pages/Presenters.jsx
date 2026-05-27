import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Play, Loader2, Square, Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";

const PRESENTERS = [
  {
    name: "Mia",
    accent: "Australian-British",
    role: "AI Presenter · 01",
    title: "Luxury Residential · Warm & Elegant",
    bio: "Australian-British inflection. Best for prestige residential, beachfront and heritage estates.",
    tags: ["Residential", "Beachfront", "Heritage"],
    img: "https://luxury-video-studio-1.emergent.host/assets/property/mia-headshot.jpg",
  },
  {
    name: "Oliver",
    accent: "British RP",
    role: "AI Presenter · 02",
    title: "Distinguished Authority · Trusted Closer",
    bio: "Refined British baritone with quiet authority. Built for commercial, off-the-plan and investor-grade properties.",
    tags: ["Commercial", "Off-the-plan", "Investor"],
    img: "https://luxury-video-studio-1.emergent.host/assets/property/oliver-portrait.jpg",
  },
  {
    name: "Aria",
    accent: "Australian",
    role: "AI Presenter · 03",
    title: "Modern Lifestyle · Fresh & Confident",
    bio: "Vibrant American voice for new developments, lifestyle marketing and Instagram-first reels.",
    tags: ["New Developments", "Lifestyle", "Social Media"],
    img: "https://luxury-video-studio-1.emergent.host/assets/property/aria-portrait.jpg",
  },
  {
    name: "Marcus",
    accent: "Continental European",
    role: "AI Presenter · 04",
    title: "International Luxe · Sophisticated",
    bio: "Continental polish for international buyers. Translates the language of wealth.",
    tags: ["International", "Penthouse", "Estate"],
    img: "https://luxury-video-studio-1.emergent.host/assets/property/marcus-portrait.jpg",
  },
  {
    name: "Emma",
    accent: "Australian",
    role: "AI Presenter · 05",
    title: "Coastal Editorial · Bright & Persuasive",
    bio: "Editorial brightness with a confident close. Built for waterfront, lifestyle and Instagram-first storytelling.",
    tags: ["Waterfront", "Lifestyle", "Social Media"],
    img: "https://luxury-video-studio-1.emergent.host/assets/property/emma-portrait.jpg",
  },
];



export default function Presenters() {
  const [playingName, setPlayingName] = useState(null);
  const [loadingName, setLoadingName] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(setIsAuthenticated);
  }, []);

  const handleHearVoice = async (presenterName) => {
    if (audioRef) {
      audioRef.pause();
      audioRef.src = "";
    }
    if (playingName === presenterName) {
      setPlayingName(null);
      return;
    }

    if (!isAuthenticated) {
      base44.auth.redirectToLogin(window.location.pathname);
      return;
    }
    setLoadingName(presenterName);
    const response = await base44.functions.invoke('previewVoice', { presenter_name: presenterName });
    const { audio_base64 } = response.data;
    const binary = atob(audio_base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const url = URL.createObjectURL(new Blob([bytes], { type: 'audio/mpeg' }));
    const audio = new Audio(url);
    setAudioRef(audio);
    setLoadingName(null);
    setPlayingName(presenterName);
    audio.play();
    audio.onended = () => setPlayingName(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8fafc" }}>
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">The Cast</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          Voices that <span style={{ color: "#C99A2E", fontStyle: "italic" }}>close.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto mb-2">
          Five signature presenters, hand-tuned for prestige real estate across continents.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/40 mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Bring your own ElevenLabs voice IDs via backend env for instant cloning
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {PRESENTERS.map((p, i) => (
            <div key={p.name} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-0 rounded-2xl overflow-hidden border border-white/8`} style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="md:w-72 lg:w-80 flex-shrink-0">
                <img src={p.img} alt={p.name} className="w-full h-72 md:h-full object-cover" />
              </div>
              <div className="flex-1 p-8 flex flex-col justify-center">
                <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">{p.accent} · {p.role}</p>
                <h2 className="text-3xl font-bold mb-1">{p.name}</h2>
                <p className="text-sm font-medium mb-3" style={{ color: "#C99A2E" }}>{p.title}</p>
                <p className="text-white/60 leading-relaxed mb-5 max-w-lg">{p.bio}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/50">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => handleHearVoice(p.name)}
                      disabled={loadingName === p.name}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all cursor-pointer disabled:cursor-not-allowed ${
                        isAuthenticated
                          ? "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                          : "border-dashed border-white/30 text-white/60 hover:border-white/50 hover:text-white hover:bg-white/5"
                      } ${loadingName === p.name ? "opacity-60" : ""}`}
                    >
                      {loadingName === p.name ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : playingName === p.name ? (
                        <Square className="w-3.5 h-3.5" />
                      ) : isAuthenticated ? (
                        <Play className="w-3.5 h-3.5" />
                      ) : (
                        <Lock className="w-3.5 h-3.5" />
                      )}
                      {loadingName === p.name ? "Generating..." : playingName === p.name ? "Stop" : isAuthenticated ? "Hear voice" : "Sign in to hear voice"}
                    </button>
                    {!isAuthenticated && (
                      <p className="text-xs text-white/30 pl-1">🔒 Audio previews require a free account</p>
                    )}
                  </div>
                  <Link to="/generate">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
                      Try with {p.name} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voice clone section */}
      <section className="py-20 px-6 border-t border-white/8" style={{ background: "rgba(201,154,46,0.04)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/40 mb-6">Concierge feature</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your voice.<br /><span style={{ color: "#C99A2E", fontStyle: "italic" }}>Your AI twin.</span></h2>
          <p className="text-white/50 mb-8 leading-relaxed max-w-xl mx-auto">Type the script once. Let an AI presenter — Mia, Oliver, <strong className="text-white">or a clone of your own voice</strong> — read it perfectly, every time. Sixty seconds of audio is all we need to train it.</p>
          <ul className="text-sm text-white/60 space-y-2 mb-8 text-left max-w-sm mx-auto">
            {["60-second voice training · upload from your phone", "Pronounces street names & suburbs the way you say them", "Use across Studio, Confidence Mode & Glamour videos", "Voice stays yours — exported with every listing video"].map(i => (
              <li key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,154,46,0.2)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C99A2E" }} />
                </div>
                {i}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/generate">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
                Begin VIP intake
              </button>
            </Link>
            <Link to="/pricing">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-white/20 text-white hover:border-white/40 transition-all">
                See Concierge plan →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}