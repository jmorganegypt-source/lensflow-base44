import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, Globe, Zap, Film, Video } from "lucide-react";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/bc7de8a58_logo-lensflow-mark.png";
const HERO_IMG = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/f3fcd76f0_hero-luxury-property-twilight.png";

export default function InputScreen({ onGenerate }) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onGenerate(url.trim());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="LensFlow" className="w-10 h-10" />
          <span className="text-xl font-bold text-white">LensFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Examples</a>
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
            Sign In
          </Button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="animate-fade-in-up max-w-3xl w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-slate-300">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>AI-Powered Real Estate Video Generation</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-white">Turn Listings Into</span>
            <br />
            <span className="gradient-text">Stunning Video Reels</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
            Paste any property listing URL and watch AI create a professional 9:16 video reel ready for Instagram, TikTok, and YouTube Shorts.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full pt-4">
            <div className={`relative rounded-2xl transition-all duration-300 ${
              isFocused ? "shadow-[0_0_40px_rgba(59,130,246,0.2)]" : "shadow-[0_0_20px_rgba(59,130,246,0.05)]"
            }`}>
              <div className="gradient-border rounded-2xl">
                <div className="flex items-center gap-3 p-2 rounded-2xl bg-[#0f1629]">
                  <div className="pl-4">
                    <Globe className="w-5 h-5 text-slate-500" />
                  </div>
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Paste your property listing URL here"
                    className="flex-1 border-0 bg-transparent text-white placeholder:text-slate-500 text-base focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                  />
                  <Button
                    type="submit"
                    disabled={!url.trim()}
                    className="h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all duration-300 disabled:opacity-40 shadow-lg shadow-blue-500/20"
                  >
                    <span className="hidden sm:inline mr-2">Generate Video Reel</span>
                    <span className="sm:hidden mr-2">Generate</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>60-second generation</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Film className="w-4 h-4 text-purple-400" />
              <span>9:16 format ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Video className="w-4 h-4 text-cyan-400" />
              <span>AI voiceover included</span>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl w-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative rounded-2xl overflow-hidden glass-card p-1">
            <img
              src={HERO_IMG}
              alt="Luxury property showcase"
              className="w-full rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
          </div>
        </div>
      </main>
    </div>
  );
}