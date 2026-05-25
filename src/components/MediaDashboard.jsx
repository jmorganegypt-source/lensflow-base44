import { Button } from "@/components/ui/button";
import { Download, Share2, RotateCcw, Play, Instagram, ExternalLink, Film } from "lucide-react";
import { useState } from "react";

const THUMB_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80";

function TikTokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.7 6.34 6.34 0 0 0 9.49 22a6.34 6.34 0 0 0 6.34-6.34V9.4a8.16 8.16 0 0 0 4.77 1.53V7.47a4.85 4.85 0 0 1-1.01-.78Z" />
    </svg>
  );
}

function YouTubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function MediaDashboard({ listingUrl, onReset }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">LensFlow</span>
        </div>
        <Button variant="ghost" onClick={onReset} className="text-slate-400 hover:text-white hover:bg-slate-800">
          <RotateCcw className="w-4 h-4 mr-2" />
          New Reel
        </Button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 pb-12">
        <div className="animate-scale-in">
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden glass-card shadow-[0_0_60px_rgba(59,130,246,0.15)]">
            <div className="absolute inset-0">
              <img
                src={THUMB_IMG}
                alt="Video preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
            {!isPlaying && (
              <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex items-center justify-center group">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="w-7 h-7 text-white ml-1" fill="white" />
                </div>
              </button>
            )}
            {isPlaying && (
              <button onClick={() => setIsPlaying(false)} className="absolute inset-0 flex items-end justify-center pb-6">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-1 bg-white rounded-full animate-pulse" style={{ height: `${16 + i * 4}px`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </button>
            )}
            <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs text-white font-medium">0:32</div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black/80" />
          </div>
        </div>

        <div className="animate-fade-in-up max-w-md space-y-8" style={{ animationDelay: "0.2s" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Video reel ready
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Your Reel is Ready</h2>
            <p className="text-slate-400 leading-relaxed">Your professional property video reel has been generated and is ready to download or share directly to social media.</p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <ExternalLink className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <span className="text-sm text-slate-400 truncate">{listingUrl}</span>
          </div>

          <div className="space-y-3">
            <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-base shadow-lg shadow-blue-500/20 transition-all duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download Video
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-medium">
              <Share2 className="w-5 h-5 mr-2" />
              Copy Share Link
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-slate-500 font-medium">Share directly to</p>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center w-12 h-12 rounded-xl glass-card hover:bg-pink-500/10 hover:border-pink-500/30 transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-xl glass-card hover:bg-slate-500/10 hover:border-slate-400/30 transition-all duration-300 group">
                <TikTokIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-xl glass-card hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 group">
                <YouTubeIcon className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-xl glass-card hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group">
                <XIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}