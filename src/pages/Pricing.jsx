import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Check, Crown, Sparkles, Star } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "$79",
    href: "https://buy.stripe.com/bJe00jc29bWsa6r2eX2go04",
    cta: "Start 7-day trial",
    features: [
      "Pro AI Teleprompter · perfect eye-contact",
      "Mia — your AI script writer + presenter",
      "1-photo Glamour Studio",
      "5 signature cinematic backgrounds",
      "Captions auto-generated",
      "Custom branding overlays",
      "1080p export · REA / Domain ready",
    ],
  },
  {
    name: "Elite",
    price: "$199",
    tagline: "Mia & Oliver are your AI presenters. You don't film a thing.",
    cta: "Start 7-day trial",
    href: "https://buy.stripe.com/cNi14n1nv2lSemHbPx2go05",
    popular: true,
    features: [
      "Everything in Starter",
      "Mia, Oliver, Aria, Marcus & Emma avatars",
      "5 HD AI productions per month",
      "5-photo Glamour Studio",
      "All 9 cinematic backgrounds",
      "3 script variants (Polished · Casual · Cinematic)",
      "Music library + your own track",
      "Priority processing queue",
    ],
  },
  {
    name: "Concierge",
    price: "$399",
    tagline: "Virtual Twin. Bespoke avatar trained on you. Total automation.",
    cta: "Begin VIP intake",
    href: "https://buy.stripe.com/8x27sLfel8Kgcez8Dl2go06",
    features: [
      "Everything in Elite",
      "Custom AI presenter trained on YOUR face",
      "Voice clone from 60s of audio",
      "Unlimited monthly productions",
      "All 9 cinematic backgrounds + custom",
      "Dedicated account manager",
      "White-glove onboarding call",
      "SLA · DPA · invoicing",
    ],
  },
];

const TABLE = [
  { feature: "Mia AI Script Writer", s: true, e: true, c: "Bespoke" },
  { feature: "Eye-Contact Teleprompter", s: true, e: true, c: "Unlimited" },
  { feature: "Glamour Photo Studio", s: "1 / photo", e: "5 photos", c: "Unlimited" },
  { feature: "3 Script Variants", s: false, e: true, c: true },
  { feature: "Music Library + Upload", s: false, e: true, c: true },
  { feature: "Mia & Oliver Avatars", s: false, e: "5 prods/mo", c: "Unlimited" },
  { feature: "Digital Twin Clone (you)", s: false, e: false, c: true },
  { feature: "Voice Clone from 60s audio", s: false, e: false, c: true },
  { feature: "Dedicated Account Manager", s: false, e: false, c: true },
  { feature: "SLA · DPA · Invoicing", s: false, e: false, c: true },
];

function Cell({ val }) {
  if (val === true) return <span style={{ color: "#C99A2E" }}>✓</span>;
  if (val === false) return <span className="text-white/20">—</span>;
  return <span className="text-sm text-white/60">{val}</span>;
}

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8fafc" }}>
      <Navbar />

      <section className="pt-32 pb-12 px-6 text-center">
        <div className="flex justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/50">
            ✦ 7-day free trial · Card required · Cancel anytime
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/50">
            ✦ Lowest price guarantee · 20% below any competitor
          </span>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Pricing</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
          Built for the way<br />
          <span style={{ color: "#C99A2E", fontStyle: "italic" }}>agents really sell.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto">Three tiers · Try every feature free for 7 days · Cancel anytime before day 8 and you're never charged.</p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`rounded-2xl border p-7 flex flex-col ${plan.popular ? "border-[#C99A2E]" : "border-white/10"}`} style={{ background: plan.popular ? "rgba(201,154,46,0.06)" : "rgba(255,255,255,0.02)" }}>
              {plan.popular && (
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#C99A2E" }}>
                  <Crown className="w-3 h-3" /> Most popular
                </div>
              )}
              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <p className="text-white/50 text-sm mb-4">{plan.tagline}</p>
              <div className="mb-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-white/40 text-sm"> AUD / month</span>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: "#C99A2E" }}>7-day free trial</p>
              <div className="mb-6">
                <a href={plan.href} target="_blank" rel="noopener noreferrer" className="block">
                  <button className={`w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${plan.popular ? "hover:opacity-90" : "border border-white/15 text-white hover:border-white/30"}`} style={plan.popular ? { background: "#C99A2E", color: "#0a0e1a" } : {}}>
                    {plan.cta}
                  </button>
                </a>
              </div>
              <ul className="space-y-2.5 mt-auto">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C99A2E" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-6 p-7 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-1">Done-for-You · Skip the studio</p>
            <h3 className="text-2xl font-bold mb-1">Hand us the listing.</h3>
            <p className="text-white/50 text-sm max-w-lg">Our editing team writes, presents, edits and delivers a broadcast-grade hero video in 24 hours. Drone, dusk, lifestyle b-roll, captions, REA-ready exports — done.</p>
          </div>
          <div className="text-center flex-shrink-0">
            <p className="text-4xl font-bold" style={{ color: "#C99A2E" }}>$1,790</p>
            <p className="text-sm text-white/40 mb-3">AUD · per listing</p>
            <a href="https://buy.stripe.com/aFaeVdaY59OkfqL7zh2go07" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20 text-white hover:border-white/40 transition-all">
                Book a session
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Exactly what's in each tier.</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <th className="text-left p-4 text-white/50 font-normal">Feature</th>
                  <th className="text-center p-4 font-semibold">Starter<br /><span className="text-white/40 font-normal text-xs">$79</span></th>
                  <th className="text-center p-4 font-semibold" style={{ color: "#C99A2E" }}>Elite<br /><span className="text-white/40 font-normal text-xs" style={{ color: "#C99A2E99" }}>$199</span></th>
                  <th className="text-center p-4 font-semibold">Concierge<br /><span className="text-white/40 font-normal text-xs">$399</span></th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/6 ${i % 2 === 0 ? "" : "bg-white/1"}`}>
                    <td className="p-4 text-white/70">{row.feature}</td>
                    <td className="p-4 text-center"><Cell val={row.s} /></td>
                    <td className="p-4 text-center"><Cell val={row.e} /></td>
                    <td className="p-4 text-center"><Cell val={row.c} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl border border-white/10" style={{ background: "rgba(201,154,46,0.04)" }}>
          <Star className="w-8 h-8 mx-auto mb-4" style={{ color: "#C99A2E" }} />
          <h3 className="text-2xl font-bold mb-3">Our 20% guarantee.</h3>
          <p className="text-white/60 leading-relaxed mb-6">Show us a comparable quote from <em>any</em> AI video tool — BIGVU, Synthesia, HeyGen, Pictory, anyone — and we'll beat it by 20%, <strong className="text-white">locked in for 12 months</strong>.</p>
          <a href="https://buy.stripe.com/bJe00jc29bWsa6r2eX2go04" target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
              <Sparkles className="w-4 h-4" />
              Start your 7-day free trial
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}