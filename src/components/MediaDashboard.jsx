import { Button } from "@/components/ui/button";
import { Download, Share2, RotateCcw, Play, Instagram, ExternalLink } from "lucide-react";
import { useState } from "react";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/bc7de8a58_logo-lensflow-mark.png";
const THUMB_IMG = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/814f6e346_sample-video-thumbnail-kitchen.png";

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
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">
      <header className="flex items-center justify-between px-8 py-5 border-b border-stone-200 bg-[#f5f0e8]/90 backdrop-blur-sm">
        <a href="https://www.lensflow.com.au" className="flex items-center gap-3">
          <img src={LOGO} alt="LensFlow" className="w-9 h-9" />
          <span className="text-lg font-bold text-stone-900 tracking-tight">LENS FLOW</span>
        </a>
        <Button variant="ghost" onClick={onReset} className="text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          New Reel
        </Button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 pb-12 pt-8">
        <div className="animate-scale-in">
          <div className="relative w-[260px] sm:w-[300px] aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-stone-200">
            <div className="absolute inset-0">
              <img
                src={THUMB_IMG}
                alt="Video preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            </div>
            {!isPlaying && (
              <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex items-center justify-center group">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Play className="w-7 h-7 text-stone-900 ml-1" fill="currentColor" />
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
            <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-xs text-white font-medium">0:32</div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black/70" />
          </div>
        </div>

        <div className="animate-fade-in-up max-w-md space-y-7" style={{ animationDelay: "0.2s" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm text-green-700 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Reel ready to download
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Your Reel is Ready</h2>
            <p className="text-stone-500 leading-relaxed">Your professional property video reel is ready to download or share directly to social media. REA · Domain · Instagram ready.</p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200 shadow-sm">
            <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <span className="text-sm text-stone-500 truncate">{listingUrl}</span>
          </div>

          <div className="space-y-3">
            <Button className="w-full h-12 rounded-xl bg-stone-900 hover:bg-stone-700 text-white font-semibold text-base shadow-sm transition-all duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download Video
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl border-stone-300 text-stone-700 hover:bg-stone-100 font-medium">
              <Share2 className="w-5 h-5 mr-2" />
              Copy Share Link
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-stone-400 font-medium">Share directly to</p>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-stone-200 hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 group shadow-sm">
                <Instagram className="w-5 h-5 text-stone-400 group-hover:text-pink-500 transition-colors" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all duration-300 group shadow-sm">
                <TikTokIcon className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-stone-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 group shadow-sm">
                <YouTubeIcon className="w-5 h-5 text-stone-400 group-hover:text-red-500 transition-colors" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all duration-300 group shadow-sm">
                <XIcon className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-400 pt-2">
            Part of the <a href="https://www.lensflow.com.au" className="text-amber-600 hover:underline font-medium">LensFlow platform</a> — Australia's #1 AI real estate media suite.
          </p>
        </div>
      </main>
    </div>
  );
}