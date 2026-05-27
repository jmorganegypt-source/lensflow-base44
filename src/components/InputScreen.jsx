import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, ArrowUpRight, Globe, Zap, Film, Video, Play, Sparkles } from "lucide-react";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/da745320e_logo-lensflow-mark.png";
const HERO_IMG = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/146903c3c_hero-luxury-property-twilight.png";

const TAGLINE = "Paste any property listing URL. Mia writes the script, voices the narration, and renders a 9:16 reel ready for REA, Instagram and TikTok.";

export default function InputScreen({ onGenerate }) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onGenerate(url.trim());
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#0F1A2E]/8 bg-[#FAF7F2]/90 backdrop-blur-sm sticky top-0 z-50">
        <a href="https://www.lensflow.com.au" className="flex items-center gap-2.5">
          <img src="https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/28910bf6b_LENSFLOWLOGO.png"

          alt="LensFlow"
          className="h-9 w-auto" />
          
        </a>
        <nav className="hidden md:flex items-center gap-7">
          <a href="https://www.lensflow.com.au/presenters" className="text-sm text-[#0F1A2E]/60 hover:text-[#0F1A2E] transition-colors">Presenters</a>
          <a href="https://www.lensflow.com.au/pricing" className="text-sm text-[#0F1A2E]/60 hover:text-[#0F1A2E] transition-colors">Pricing</a>
          <a href="https://www.lensflow.com.au/compare" className="text-sm text-[#0F1A2E]/60 hover:text-[#0F1A2E] transition-colors">Compare</a>
          <a href="https://www.lensflow.com.au" className="text-sm text-[#0F1A2E]/60 hover:text-[#0F1A2E] transition-colors">Done-for-You</a>
          <a href="https://www.lensflow.com.au/login" className="text-sm text-[#0F1A2E]/70 hover:text-[#0F1A2E] transition-colors">Sign In</a>
          <a href="https://www.lensflow.com.au/register">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F1A2E] text-white text-sm font-medium hover:bg-[#1A2944] transition-all">
              Start Recording
            </button>
          </a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,154,46,0.08) 0%, transparent 70%)" }} />

        <div className="animate-fade-in-up max-w-3xl w-full text-center space-y-7 pt-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C99A2E]/40 shadow-sm">
            <Trophy className="w-3 h-3 text-[#C99A2E]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#0F1A2E]/70">#1 AI Real Estate Media Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0F1A2E] leading-[0.95]">
            Turn Listings Into
            <br />
            <span style={{ color: "#C99A2E" }}>Stunning Video Reels</span>
          </h1>

          <p className="text-lg md:text-xl text-[#0F1A2E]/60 max-w-xl mx-auto leading-relaxed">
            {TAGLINE}
          </p>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full pt-2">
            <div className={`relative rounded-2xl transition-all duration-300 ${isFocused ? "shadow-[0_0_40px_rgba(201,154,46,0.15)]" : "shadow-[0_4px_24px_rgba(15,26,46,0.08)]"}`}>
              <div className="gradient-border rounded-2xl pointer-events-none">
                <div className="flex items-center gap-3 p-2 rounded-2xl bg-white pointer-events-auto">
                  <div className="pl-4 pointer-events-none">
                    <Globe className="w-5 h-5 text-[#0F1A2E]/30" />
                  </div>
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Paste your property listing URL here"
                    className="flex-1 border-0 bg-transparent text-[#0F1A2E] placeholder:text-[#0F1A2E]/30 text-base focus-visible:ring-0 focus-visible:ring-offset-0 h-12 cursor-text" />
                  <button
                    type="submit"
                    disabled={!url.trim()}
                    className="h-12 px-6 rounded-xl bg-[#0F1A2E] hover:bg-[#1A2944] disabled:bg-[#0F1A2E]/50 text-white text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed inline-flex items-center gap-2 flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[#C99A2E]" />
                    <span className="hidden sm:inline">Generate Reel</span>
                    <span className="sm:hidden">Generate</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <div className="flex items-center gap-2 text-sm text-[#0F1A2E]/50">
              <Zap className="w-4 h-4 text-[#C99A2E]" />
              <span>60-second generation</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#0F1A2E]/50">
              <Film className="w-4 h-4 text-[#C99A2E]" />
              <span>9:16 format ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#0F1A2E]/50">
              <Video className="w-4 h-4 text-[#C99A2E]" />
              <span>Mia AI voiceover</span>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-14 max-w-4xl w-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(15,26,46,0.12)] border border-[#0F1A2E]/8">
            <img
              src={HERO_IMG}
              alt="Luxury property showcase"
              className="w-full rounded-xl" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E]/40 via-transparent to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1">Trusted by elite agents</p>
              <p className="text-sm font-semibold">Sydney · London · Dubai</p>
            </div>
          </div>
        </div>
      </main>
    </div>);

}