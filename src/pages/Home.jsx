import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DemoClipsSection from "../components/DemoClipsSection";
import DashboardTutorial from "../components/DashboardTutorial";
import { ArrowRight, Check, Star, Zap, Film, Camera, Sparkles } from "lucide-react";
import VideoPlayer from "../components/VideoPlayer";

const MIA = "https://luxury-video-studio-1.emergent.host/assets/property/mia-headshot.jpg";
const OLIVER = "https://luxury-video-studio-1.emergent.host/assets/property/oliver-portrait.jpg";
const ARIA = "https://luxury-video-studio-1.emergent.host/assets/property/aria-portrait.jpg";
const MARCUS = "https://luxury-video-studio-1.emergent.host/assets/property/marcus-portrait.jpg";
const HERO_BG = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/146903c3c_hero-luxury-property-twilight.png";
const KITCHEN = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/448449b68_sample-video-thumbnail-kitchen.png";

const FEATURES = [
  {
    num: "01",
    label: "Photo Enhancement",
    badge: "Before — After · Magazine HDR",
    title: "Turn iPhone photos into magazine spreads.",
    body: "Upload any property photo. Pick a look — Magazine HDR, Golden Hour, Dusk Twilight, Lifestyle Lush, Interior Polish. AI enhances it in ~30 seconds.",
    img: KITCHEN,
  },
  {
    num: "02",
    label: "Listing Videos",
    badge: "Auto-narrated · MP4 · 1080p",
    title: "Listing videos — without filming yourself.",
    body: "Mia or Oliver narrates your listing over a Ken-Burns slideshow of your photos. Get a downloadable MP4 in under a minute. Perfect for camera-shy agents.",
    img: MIA,
    videos: [
      { label: "Mia", src: "https://drive.google.com/file/d/1uRfjDgzVXunEf0mPwWedL3CtZNXVneld/preview", cover: MIA },
      { label: "Oliver", src: "https://drive.google.com/file/d/1Uk99bSMX8casyTyFH2Q7xVx6LD1s6C3M/preview", cover: OLIVER },
    ],
  },
  {
    num: "03",
    label: "Branded Reels",
    badge: "9:16 · 16:9 · 1:1 · Auto-branded",
    title: "Auto-branded reels for every property.",
    body: "Add price, address, your face + logo automatically. Export 9:16 for Reels, 16:9 for YouTube, 1:1 for Instagram. REA · Domain · Rightmove ready.",
    img: HERO_BG,
  },
];

const PERKS = [
  "AI Teleprompter with perfect eye-contact",
  "Mia + Oliver — your digital presenter twins",
  "Property photo glamour enhancement",
  "REA · Domain · Rightmove-ready exports",
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8fafc" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0a0e1a60, #0a0e1a)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono uppercase tracking-widest text-white/60 mb-8">
              <Star className="w-3 h-3" style={{ color: "#C99A2E" }} />
              #1 AI Real Estate Media Platform
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] mb-6">
              Stop wasting 8 hours<br />
              on video every week.<br />
              <span style={{ color: "#C99A2E", fontStyle: "italic" }}>Get them back instantly.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
              The big apps make you do the work. LensFlow lets Mia do it for you — she writes the script, sets the stage, and reads it on camera. Record on your phone, or skip filming entirely.
            </p>
            <ul className="space-y-2 mb-10">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-white/70">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,154,46,0.2)" }}>
                    <Check className="w-2.5 h-2.5" style={{ color: "#C99A2E" }} />
                  </div>
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.lensflow.com.au/register">
                <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
                  <Sparkles className="w-4 h-4" />
                  Start your trial
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <a href="https://www.lensflow.com.au/concierge">
                <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border border-white/20 text-white hover:border-white/40 transition-all">
                  <Film className="w-4 h-4" />
                  Book a live demo
                </button>
              </a>
            </div>
            <p className="mt-4 text-xs text-white/30">Trusted by elite agents — Sydney · London · Dubai</p>
          </div>

          {/* Presenter cards */}
          <div className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center gap-4 pr-6">
            <div className="relative w-52 h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={MIA} alt="Mia" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0e1a80, transparent)" }} />
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Mia · AU · US · Warm
                </div>
              </div>
            </div>
            <div className="relative w-44 h-60 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-8">
              <img src={OLIVER} alt="Oliver" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0e1a80, transparent)" }} />
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-white">
                  Oliver · UK · RP
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generate CTA strip */}
      <section className="py-8 px-6 border-y border-white/8" style={{ background: "rgba(201,154,46,0.06)" }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-mono uppercase tracking-widest text-white/40 mb-1">Try the AI Reel Generator</p>
            <h3 className="text-xl font-bold text-white">Paste a listing URL. Get a video in 60 seconds.</h3>
          </div>
          <Link to="/generate">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
              <Zap className="w-4 h-4" />
              Generate a Reel Free
            </button>
          </Link>
        </div>
      </section>

      {/* Three features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4 text-center">What is LensFlow?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Three things, one platform.<br />
            <span className="text-white/50">All for your listings.</span>
          </h2>
          <div className="space-y-12">
            {FEATURES.map((f, i) => (
              <div key={f.num} className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-white/30">{f.num} · {f.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-white/15 text-white/50">{f.badge}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">{f.title}</h3>
                  <p className="text-white/60 leading-relaxed">{f.body}</p>
                  <a href="https://www.lensflow.com.au/pricing">
                    <button className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity mt-2" style={{ color: "#C99A2E" }}>
                      See plans + pricing <ArrowRight className="w-4 h-4" />
                    </button>
                  </a>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  {f.videos ? (
                    f.videos.map((v, vi) => (
                    <VideoPlayer key={vi} src={v.src} label={v.label} coverImage={v.cover} />
                  ))
                  ) : (
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <img src={f.img} alt={f.label} className="w-full h-64 md:h-80 object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presenters strip */}
      <section className="py-20 px-6 border-t border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Your AI Twins</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Mia + Oliver.</h2>
          <p className="text-white/50 max-w-xl mx-auto mb-12">Photoreal AI presenters that speak in your voice and style — so you can be everywhere, without being there.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { img: MIA, name: "Mia", accent: "Australian-British", spec: "Luxury Residential" },
              { img: OLIVER, name: "Oliver", accent: "British RP", spec: "Commercial + Investor" },
              { img: ARIA, name: "Aria", accent: "American", spec: "New Developments" },
              { img: MARCUS, name: "Marcus", accent: "Continental", spec: "International Luxury" },

            ].map((p) => (
              <div key={p.name} className="group text-center">
                <div className="w-28 h-36 md:w-36 md:h-48 rounded-2xl overflow-hidden border border-white/10 mb-3 mx-auto group-hover:border-white/30 transition-all">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="font-semibold text-white">{p.name}</p>
                <p className="text-xs text-white/40">{p.accent}</p>
                <p className="text-xs mt-0.5" style={{ color: "#C99A2E" }}>{p.spec}</p>
              </div>
            ))}
          </div>
          <Link to="/presenters">
            <button className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm text-white hover:border-white/40 transition-all">
              See all 5 presenters <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-24 px-6 border-t border-white/8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">From $79 / month.<br /><span className="text-white/50">Less than one listing photographer.</span></h2>
          <p className="text-white/50 mb-12">Four tiers · 7-day free trial on all subscriptions · Cancel anytime</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { name: "Starter", price: "$79", desc: "The sole performer. Film yourself, beautifully.", cta: "Start trial", features: [] },
              { name: "Elite", price: "$199", desc: "Mia + Oliver are your AI presenters. You don't film a thing.", cta: "Start trial", popular: true, features: [] },
              { name: "Concierge", price: "$399", desc: "Virtual Twin. Total automation. Bespoke avatar. + SaaS Dashboard.", cta: "Begin VIP intake", features: ["Dedicated AI presenters", "Full automation", "SaaS Dashboard", "Reel history & analytics", "Team management"] },
            ].map((plan) => (
              <div key={plan.name} className={`p-6 rounded-2xl border text-left transition-all flex flex-col ${plan.popular ? "border-[#C99A2E]" : "border-white/10"}`} style={{ background: plan.popular ? "rgba(201,154,46,0.06)" : "rgba(255,255,255,0.03)" }}>
                {plan.popular && <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#C99A2E" }}>Most Popular</div>}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-3xl font-bold mb-2" style={{ color: "#C99A2E" }}>{plan.price}<span className="text-sm text-white/40 font-normal"> AUD/mo</span></p>
                <p className="text-sm text-white/50 mb-4">{plan.desc}</p>
                {plan.features.length > 0 && (
                  <ul className="text-xs text-white/50 mb-6 space-y-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span style={{ color: "#C99A2E" }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <a href="https://www.lensflow.com.au/register">
                  <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.popular ? "" : "border border-white/15 text-white hover:border-white/30"}`} style={plan.popular ? { background: "#C99A2E", color: "#0a0e1a" } : {}}>
                    {plan.cta}
                  </button>
                </a>
              </div>
            ))}
          </div>
          <Link to="/pricing" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#C99A2E" }}>
            See full pricing + feature comparison
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/8 text-center" style={{ background: "rgba(201,154,46,0.04)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your listings.<br /><span style={{ color: "#C99A2E", fontStyle: "italic" }}>Reimagined.</span></h2>
          <p className="text-white/50 mb-8">Join the agents already replacing $14K agency invoices with one platform.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://www.lensflow.com.au/register">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
                Start recording today <ArrowRight className="w-5 h-5" />
              </button>
            </a>
            <Link to="/generate">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base border border-white/20 text-white hover:border-white/40 transition-all">
                <Camera className="w-5 h-5" />
                Try the Reel Generator
              </button>
            </Link>
          </div>
        </div>
      </section>

      <DashboardTutorial />
      <DemoClipsSection />
      <Footer />
    </div>
  );
}