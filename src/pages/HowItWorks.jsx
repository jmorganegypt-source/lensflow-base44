import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Upload, User, Mic, Sparkles, Download } from "lucide-react";

const HERO_BG = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/146903c3c_hero-luxury-property-twilight.png";
const MIA = "https://lensflow.com.au/assets/property/mia-headshot.jpg";

const STEPS = [
  {
    num: "01",
    icon: Upload,
    title: "Upload Photos",
    body: "Add your property photos or video. Drag and drop from your phone or desktop. We support JPG, PNG, MP4 and more.",
  },
  {
    num: "02",
    icon: User,
    title: "Choose Mia or Oliver",
    body: "Select your AI presenter — or upload your own face for the Concierge tier. Pick accent, style and tone.",
  },
  {
    num: "03",
    icon: Mic,
    title: "Read + Record",
    body: "Use the AI teleprompter with perfect eye-contact. Your script appears near the camera lens — speak naturally.",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "AI Enhances",
    body: "LensFlow polishes your visuals, audio and script automatically. Glamour Studio applies magazine-grade photo enhancement.",
  },
  {
    num: "05",
    icon: Download,
    title: "Get Your Assets",
    body: "Download 9:16 reels, 16:9 hero videos, 1:1 social posts, brochures and copy. REA · Domain · Rightmove ready.",
  },
];

const MODES = [
  {
    title: "Confidence Mode",
    badge: "01",
    desc: "For agents who'd rather not film themselves. Drop a script and listing photos. Pick a presenter. LensFlow composes a finished MP4 listing video — narrated by AI, Ken-Burns slideshow. No camera, no anxiety.",
    cta: "Try Confidence Mode",
    href: "https://www.lensflow.com.au/register",
  },
  {
    title: "Glamour Studio",
    badge: "02",
    desc: "iPhone photos → Architectural Digest grade. Upload a regular listing photo. Pick a look — Magazine HDR, Golden Hour, Dusk Twilight, Lifestyle, Interior Polish. Powered by AI image enhancement.",
    cta: "Try Glamour Studio",
    href: "https://www.lensflow.com.au/register",
  },
  {
    title: "Voice Clone · Elite",
    badge: "03",
    desc: "Listings in your voice — without filming. Record 60 seconds. ElevenLabs clones your voice. Every future listing video is narrated by you, on autopilot. Personal brand without the camera.",
    cta: "See Elite Partner",
    href: "https://www.lensflow.com.au/pricing",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8fafc" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">The Workflow</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
          One upload.<br />
          <span style={{ color: "#C99A2E", fontStyle: "italic" }}>Complete campaign.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto">From listing photos to broadcast-grade video, branded reels and social assets — in under a minute.</p>
      </section>

      {/* Steps */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, #C99A2E40, #C99A2E10)" }} />
            <div className="space-y-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex gap-6 items-start p-6 rounded-2xl border border-white/8 transition-all hover:border-white/15" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10" style={{ background: "rgba(201,154,46,0.1)" }}>
                        <Icon className="w-7 h-7" style={{ color: "#C99A2E" }} />
                      </div>
                      <span className="text-xs font-mono text-white/20">{step.num}</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-white/60 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Three exclusive modes */}
      <section className="py-20 px-6 border-t border-white/8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4 text-center">World-first · Real estate only</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Three things no one else offers.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {MODES.map((m) => (
              <div key={m.title} className="p-7 rounded-2xl border border-white/8 flex flex-col" style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="text-xs font-mono text-white/30 mb-3">{m.badge} —</span>
                <h3 className="text-xl font-bold mb-3">{m.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">{m.desc}</p>
                <a href={m.href}>
                  <button className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#C99A2E" }}>
                    {m.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-20 px-6 border-t border-white/8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/10">
            <img src={MIA} alt="Mia narrating a listing" className="w-full h-72 md:h-96 object-cover" />
          </div>
          <div className="flex-1 space-y-5">
            <p className="text-xs font-mono uppercase tracking-widest text-white/30">Live demo · Real listing</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">This is what your next listing looks like.</h2>
            <p className="text-white/60 leading-relaxed">A real Mosman premium listing, narrated by Mia, branded and ready for REA, Domain and Instagram. Same Mia. Same Oliver. Any property. Any agent.</p>
            <ul className="space-y-2 text-sm text-white/60">
              {["Auto-overlay price, address, agent + brokerage", "Mia or Oliver narrate in 4 voice profiles", "Export 9:16 reel · 16:9 hero · 1:1 social"].map(i => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C99A2E" }} />
                  {i}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap pt-2">
              <Link to="/generate">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
                  <Sparkles className="w-4 h-4" />
                  Make my first listing
                </button>
              </Link>
              <a href="https://www.lensflow.com.au/register">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-white/20 text-white hover:border-white/40 transition-all">
                  Start free trial
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}