import { useState } from "react";

export default function VideoPlayer({ src, label, coverImage }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <p className="text-xs font-mono text-white/40 px-3 pt-2">{label}</p>
      <div className="relative w-full h-56 md:h-64">
        {playing ?
        <iframe
          src={src + "&autoplay=1"}
          className="w-full h-full"
          allow="autoplay"
          allowFullScreen
          style={{ border: "none" }} /> :


        <div
          className="relative w-full h-full cursor-pointer group"
          onClick={() => setPlaying(true)}>
          
            <img
            src={coverImage}
            alt={label}
            className="w-full h-full object-cover" />
          
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}