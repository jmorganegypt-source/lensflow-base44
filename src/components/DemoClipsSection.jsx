import { useState, useEffect, useRef } from "react";
import { Play, Pause, CheckCircle, XCircle } from "lucide-react";

const MIA_IMG = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/4fb729f41_ChatGPTImageMay26202605_39_24PM.png";
const BG_IMG = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop";

const SCRIPT_LINES = [
  "Thinking about selling your home?",
  "In today's market, you need more than just a sign in the yard.",
  "I use elite marketing, cinematic video, and AI-powered content to showcase your home to the right buyers.",
  "My goal is simple — to get you top dollar in the least amount of time possible.",
  "Luxury presentation. Proven results. Maximum exposure.",
  "Let's make your next move your best move with LensFlow.",
];

// Clip A — With LensFlow (teleprompter, professional)
function LensFlowClip() {
  const [playing, setPlaying] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const DURATION = 30;
  const LINE_INTERVAL = (DURATION / SCRIPT_LINES.length) * 1000;

  const reset = () => {
    setPlaying(false);
    setLineIndex(0);
    setElapsed(0);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!playing) return;
    const lineTimer = setInterval(() => {
      setLineIndex((i) => {
        if (i >= SCRIPT_LINES.length - 1) { reset(); return 0; }
        return i + 1;
      });
    }, LINE_INTERVAL);

    const secTimer = setInterval(() => {
      setElapsed((e) => {
        if (e >= DURATION) { clearInterval(secTimer); return 0; }
        return e + 1;
      });
    }, 1000);

    intervalRef.current = lineTimer;
    return () => { clearInterval(lineTimer); clearInterval(secTimer); };
  }, [playing]);

  const fmtTime = (s) => `0:${String(s).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone frame */}
      <div className="relative w-[200px] h-[355px] rounded-[32px] overflow-hidden border-4 border-[#1a1a1a] shadow-2xl bg-black" style={{ boxShadow: "0 0 0 2px #333, 0 30px 80px rgba(0,0,0,0.6)" }}>
        {/* BG with zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-[-5%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${BG_IMG})`,
              animation: playing ? "demozoom 30s ease-in-out infinite alternate" : "none",
              filter: "brightness(0.75)",
            }}
          />
        </div>

        {/* Mia */}
        <img src={MIA_IMG} alt="Mia" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[78%] object-contain z-10" style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }} />

        {/* Logo */}
        <div className="absolute top-3 left-0 right-0 flex flex-col items-center z-20">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-xs tracking-widest" style={{ fontFamily: "serif", letterSpacing: "0.15em" }}>LENSFLOW</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-black" style={{ background: "#C99A2E" }}>PRO</span>
          </div>
          <span className="text-[9px] tracking-widest text-white/60 mt-0.5">ELITE ACCESS</span>
        </div>

        {/* Teleprompter overlay — bottom */}
        {playing && (
          <div className="absolute bottom-0 left-0 right-0 z-30 pb-3 pt-6" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 60%, transparent)" }}>
            <div className="px-3 text-center">
              <p className="text-white text-[11px] leading-snug font-medium transition-all duration-500" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                {SCRIPT_LINES[lineIndex]}
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#C99A2E" }} />
                <span className="text-[9px] text-white/50 font-mono">{fmtTime(elapsed)} / 0:{DURATION}</span>
              </div>
            </div>
          </div>
        )}

        {/* Play button overlay */}
        {!playing && (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 z-40 flex items-center justify-center group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110" style={{ background: "rgba(201,154,46,0.9)" }}>
              <Play className="w-6 h-6 text-black ml-1" fill="black" />
            </div>
          </button>
        )}

        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-black z-50" />

        {/* Recording dot */}
        {playing && <div className="absolute top-4 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse z-50" />}
      </div>

      {/* Labels */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(201,154,46,0.12)", color: "#C99A2E" }}>
          <CheckCircle className="w-3.5 h-3.5" /> With LensFlow
        </div>
        <p className="text-xs text-white/40 max-w-[180px]">Teleprompter · AI voice · Cinematic output</p>
      </div>
    </div>
  );
}

// Clip B — Without LensFlow (phone selfie, shaky, awkward)
function DIYClip() {
  const [playing, setPlaying] = useState(false);
  const [tick, setTick] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setTick((x) => x + 1), 120);
    const s = setInterval(() => setElapsed((e) => {
      if (e >= 30) { setPlaying(false); clearInterval(s); return 0; }
      return e + 1;
    }), 1000);
    intervalRef.current = t;
    return () => { clearInterval(t); clearInterval(s); };
  }, [playing]);

  // Simulate shaky camera
  const shakeX = playing ? Math.sin(tick * 0.9) * 2.5 : 0;
  const shakeY = playing ? Math.cos(tick * 1.1) * 1.5 : 0;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone frame — rotated slightly, DIY feel */}
      <div className="relative w-[200px] h-[355px] rounded-[32px] overflow-hidden border-4 border-[#2a2a2a] shadow-xl bg-[#111]"
        style={{
          boxShadow: "0 0 0 2px #444, 0 20px 50px rgba(0,0,0,0.5)",
          transform: `translate(${shakeX}px, ${shakeY}px) rotate(-1deg)`,
          transition: playing ? "transform 0.12s linear" : "transform 0.3s ease",
        }}>

        {/* Grainy, slightly washed-out BG */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG_IMG})`, filter: "brightness(0.55) saturate(0.6)", transform: "scale(1.05)" }} />
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)" }} />
          {/* Slight vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 60% 40%, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
        </div>

        {/* Mia — off-center, slightly cut off, holding phone arm visible */}
        <img src={MIA_IMG} alt="Mia" className="absolute bottom-0 z-10 h-[72%] object-contain"
          style={{
            left: "30%",
            filter: "brightness(0.8) drop-shadow(0 5px 10px rgba(0,0,0,0.4))",
          }} />

        {/* Simulated arm holding phone — a blurry foreground element */}
        <div className="absolute bottom-0 left-0 w-[38%] h-[55%] z-20 rounded-tr-3xl"
          style={{ background: "linear-gradient(135deg, #8B6B4A 0%, #6B4E35 50%, #4a3020 100%)", opacity: 0.85 }} />
        <div className="absolute bottom-0 left-0 w-[32%] h-[50%] z-21 rounded-tr-2xl"
          style={{ background: "linear-gradient(135deg, #c4956a 0%, #9d7249 60%, #6B4E35 100%)", opacity: 0.7 }} />

        {/* Phone in hand */}
        <div className="absolute bottom-[12%] left-[2%] w-[28%] h-[30%] z-25 rounded-xl border-2 border-[#333] bg-[#111] shadow-lg flex items-center justify-center overflow-hidden">
          <div className="w-full h-full opacity-40" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
            <div className="p-1 text-center mt-2">
              <div className="text-[5px] text-white/40 font-mono leading-tight">reading script...</div>
            </div>
          </div>
        </div>

        {/* Bad framing badge */}
        {playing && (
          <div className="absolute top-10 left-2 right-2 z-30 px-2 py-1 rounded text-center" style={{ background: "rgba(0,0,0,0.5)" }}>
            <p className="text-[9px] text-yellow-300/80">⚠ Wind noise detected</p>
          </div>
        )}

        {/* Focus hunting indicator */}
        {playing && tick % 30 < 5 && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 border border-yellow-400/60 rounded-sm" />
          </div>
        )}

        {/* Timestamp watermark */}
        <div className="absolute bottom-3 right-3 z-30 text-[8px] text-white/40 font-mono">
          {playing ? `0:${String(elapsed).padStart(2, "0")} / 0:30` : "0:00 / 0:30"}
        </div>

        {/* Play button */}
        {!playing && (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 z-40 flex items-center justify-center group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 bg-white/20 backdrop-blur-sm border border-white/30">
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            </div>
          </button>
        )}

        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-black z-50" />

        {/* Recording dot */}
        {playing && <div className="absolute top-4 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse z-50" />}
      </div>

      {/* Labels */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400">
          <XCircle className="w-3.5 h-3.5" /> Without LensFlow
        </div>
        <p className="text-xs text-white/40 max-w-[180px]">Shaky · Off-frame · Reading from phone</p>
      </div>
    </div>
  );
}

export default function DemoClipsSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0a0e1a" }}>
      <style>{`
        @keyframes demozoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-3">The Difference Is Obvious</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            This Is What You're Missing
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            Press play on both. One agent uses LensFlow's teleprompter and AI production. The other holds their phone with their other arm and hopes for the best.
          </p>
        </div>

        {/* Clips side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <LensFlowClip />

          {/* VS divider */}
          <div className="flex sm:flex-col items-center gap-3">
            <div className="w-12 h-px sm:w-px sm:h-12 bg-white/10" />
            <span className="text-xs font-bold text-white/20 tracking-widest">VS</span>
            <div className="w-12 h-px sm:w-px sm:h-12 bg-white/10" />
          </div>

          <DIYClip />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <a href="/generate">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #C99A2E, #e8c86d)", color: "#0a0e1a" }}>
              Create Your Reel Free →
            </button>
          </a>
          <p className="text-white/20 text-xs mt-3">No credit card required · First reel free</p>
        </div>
      </div>
    </section>
  );
}