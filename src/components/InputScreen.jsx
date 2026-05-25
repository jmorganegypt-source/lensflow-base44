import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, Globe, Zap, Film, Video } from "lucide-react";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/bc7de8a58_logo-lensflow-mark.png";
const HERO_IMG = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/f3fcd76f0_hero-luxury-property-twilight.png";
const TAGLINE = "Paste any property listing URL. Mia writes the script, voices the narration, and renders a 9:16 reel ready for REA, Instagram and TikTok.";

export default function InputScreen({ onGenerate }) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onGenerate(url.trim());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
      <header className="flex items-center justify-between px-8 py-5 border-b border-stone-200 bg-[#f5f0e8]/90 backdrop-blur-sm">
        <a href="https://www.lensflow.com.au" className="flex items-center gap-3">
          <img src={LOGO} alt="LensFlow" className="w-9 h-9" />
          <span className="text-lg font-bold text-stone-900 tracking-tight">LENS FLOW</span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          <a href="https://www.lensflow.com.au/presenters" className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-medium">Presenters</a>
          <a href="https://www.lensflow.com.au/pricing" className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-medium">Pricing</a>
          <a href="https://www.lensflow.com.au/compare" className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-medium">Compare</a>
          <a href="https://www.lensflow.com.au" className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-medium">Done-for-You</a>
          <a href="https://www.lensflow.com.au/login" className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium">Sign In</a>
          <a href="https://www.lensflow.com.au/register">
            <Button className="rounded-full bg-stone-900 hover:bg-stone-700 text-white text-sm px-5 font-medium">
              Start Recording
            </Button>
          </a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="animate-fade-in-up max-w-3xl w-full text-center space-y-7 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/60 bg-amber-50 text-sm text-amber-800 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>#1 AI Real Estate Media Platform</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-tight">
            Turn Listings Into
            <br />
            <span className="gradient-text">Stunning Video Reels</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-500 max-w-xl mx-auto leading-relaxed">
            {TAGLINE}
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full pt-2">
            <div className={`relative rounded-2xl transition-all duration-300 ${
              isFocused ? "shadow-[0_0_40px_rgba(201,145,58,0.15)]" : "shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            }`}>
              <div className="gradient-border rounded-2xl">
                <div className="flex items-center gap-3 p-2 rounded-2xl bg-white">
                  <div className="pl-4">
                    <Globe className="w-5 h-5 text-stone-400" />
                  </div>
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Paste your property listing URL here"
                    className="flex-1 border-0 bg-transparent text-stone-900 placeholder:text-stone-400 text-base focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                  />
                  <Button
                    type="submit"
                    disabled={!url.trim()}
                    className="h-12 px-6 rounded-xl bg-stone-900 hover:bg-stone-700 text-white font-semibold transition-all duration-300 disabled:opacity-40 shadow-sm"
                  >
                    <span className="hidden sm:inline mr-2">Generate Reel</span>
                    <span className="sm:hidden mr-2">Generate</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>60-second generation</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Film className="w-4 h-4 text-amber-600" />
              <span>9:16 format ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Video className="w-4 h-4 text-amber-500" />
              <span>Mia AI voiceover</span>
            </div>
          </div>
        </div>

        <div className="mt-14 max-w-4xl w-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-stone-200">
            <img
              src={HERO_IMG}
              alt="Luxury property showcase"
              className="w-full rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-1">Trusted by elite agents</p>
              <p className="text-sm font-semibold">Sydney · London · Dubai</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}