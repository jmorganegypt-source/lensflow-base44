import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Crown, Check, X } from "lucide-react";

const ENTRY = [
  { name: "LensFlow", price: "$23.90", currency: "AUD/mo", best: true, badge: "20% under everyone" },
  { name: "BIGVU", price: "$24.99", currency: "USD/mo" },
  { name: "Pictory", price: "$25.00", currency: "USD/mo" },
  { name: "Synthesia", price: "$29.00", currency: "USD/mo" },
  { name: "HeyGen", price: "$29.00", currency: "USD/mo" },
];

const PRO = [
  { name: "LensFlow", price: "$59.90", currency: "AUD/mo", best: true, badge: "33% under HeyGen" },
  { name: "BIGVU AI Pro", price: "$39.00", currency: "USD/mo" },
  { name: "BIGVU AI Max", price: "$79.90", currency: "USD/mo" },
  { name: "Synthesia Creator", price: "$89.00", currency: "USD/mo" },
  { name: "HeyGen Pro", price: "$99.00", currency: "USD/mo" },
];

const FEATURES = [
  { feature: "AI Teleprompter (perfect eye contact)", lf: true, bigvu: true, syn: false, hey: false, pic: false },
  { feature: "4 photoreal AI presenters", lf: true, bigvu: false, syn: true, hey: true, pic: false },
  { feature: "Property Photo Glamour Enhancement", lf: true, bigvu: false, syn: false, hey: false, pic: false, exclusive: true },
  { feature: "Confidence Mode (auto-record for you)", lf: true, bigvu: false, syn: false, hey: false, pic: false, exclusive: true },
  { feature: "Personal Voice Clone (your voice)", lf: true, bigvu: false, syn: true, hey: true, pic: false },
  { feature: "REA · Domain · Rightmove auto-exports", lf: true, bigvu: false, syn: false, hey: false, pic: false, exclusive: true },
  { feature: "Auto-overlay price / address / agent", lf: true, bigvu: false, syn: false, hey: false, pic: false, exclusive: true },
  { feature: "9:16 · 16:9 · 1:1 exports", lf: true, bigvu: true, syn: true, hey: true, pic: true },
  { feature: "Australian / British / American voices", lf: true, bigvu: false, syn: true, hey: true, pic: false },
  { feature: "Built specifically for real estate", lf: true, bigvu: false, syn: false, hey: false, pic: false, exclusive: true },
  { feature: "PWA — install as mobile app", lf: true, bigvu: false, syn: false, hey: false, pic: false, exclusive: true },
  { feature: "7-day free trial · card required", lf: true, bigvu: true, syn: true, hey: true, pic: true },
  { feature: "AUD pricing · GST inclusive", lf: true, bigvu: false, syn: false, hey: false, pic: false, exclusive: true },
  { feature: "No video minute / credit caps", lf: true, bigvu: false, syn: false, hey: false, pic: false },
];

function PriceRow({ data, title }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-white/70 mb-4">{title}</h3>
      {data.map((item) => (
        <div key={item.name} className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${item.best ? "border-[#C99A2E]" : "border-white/8"}`} style={{ background: item.best ? "rgba(201,154,46,0.08)" : "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center gap-3">
            {item.best && <Crown className="w-4 h-4 flex-shrink-0" style={{ color: "#C99A2E" }} />}
            <span className={`font-semibold ${item.best ? "text-white" : "text-white/60"}`}>{item.name}</span>
            {item.badge && <span className="text-xs px-2 py-0.5 rounded-full font-mono uppercase tracking-wider" style={{ background: "rgba(201,154,46,0.2)", color: "#C99A2E" }}>{item.badge}</span>}
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${item.best ? "" : "text-white/60"}`} style={item.best ? { color: "#C99A2E" } : {}}>{item.price}</span>
            <span className="text-xs text-white/30 ml-1">{item.currency}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Compare() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8fafc" }}>
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/50 mb-6">
          ✦ Lowest price guarantee · 20% under any competitor
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Why agents switch</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
          LensFlow vs <span style={{ color: "#C99A2E", fontStyle: "italic" }}>everyone else.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto">
          Honest, side-by-side comparison with BIGVU, Synthesia, HeyGen and Pictory — pulled from each company's public 2026 pricing pages.
        </p>
      </section>

      {/* Price comparisons */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto space-y-12">
          <PriceRow data={ENTRY} title="Entry-tier pricing" />
          <PriceRow data={PRO} title="Pro / Creator tier" />
        </div>
      </section>

      {/* Feature matrix */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Feature matrix</h2>
          <p className="text-center text-white/40 text-sm mb-10">Gold checkmarks = features no one else has. Generic AI tools weren't built for real estate. LensFlow was.</p>
          <div className="rounded-2xl border border-white/10 overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <th className="text-left p-4 text-white/40 font-normal w-64">Feature</th>
                  <th className="text-center p-4 font-bold" style={{ color: "#C99A2E" }}>LensFlow</th>
                  <th className="text-center p-4 text-white/50 font-normal">BIGVU</th>
                  <th className="text-center p-4 text-white/50 font-normal">Synthesia</th>
                  <th className="text-center p-4 text-white/50 font-normal">HeyGen</th>
                  <th className="text-center p-4 text-white/50 font-normal">Pictory</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/6 ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                    <td className="p-4 text-white/70 text-sm">
                      {row.feature}
                      {row.exclusive && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded font-mono uppercase" style={{ background: "rgba(201,154,46,0.15)", color: "#C99A2E" }}>Exclusive</span>}
                    </td>
                    <td className="p-4 text-center text-lg font-bold" style={{ color: "#C99A2E" }}>{row.lf ? "✓" : <span className="text-white/20 text-sm">—</span>}</td>
                    <td className="p-4 text-center">{row.bigvu ? <Check className="w-4 h-4 mx-auto text-white/40" /> : <X className="w-4 h-4 mx-auto text-white/15" />}</td>
                    <td className="p-4 text-center">{row.syn ? <Check className="w-4 h-4 mx-auto text-white/40" /> : <X className="w-4 h-4 mx-auto text-white/15" />}</td>
                    <td className="p-4 text-center">{row.hey ? <Check className="w-4 h-4 mx-auto text-white/40" /> : <X className="w-4 h-4 mx-auto text-white/15" />}</td>
                    <td className="p-4 text-center">{row.pic ? <Check className="w-4 h-4 mx-auto text-white/40" /> : <X className="w-4 h-4 mx-auto text-white/15" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Savings callouts */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { val: "$66 / yr", label: "Saved vs HeyGen Pro", sub: "annual subscription saving" },
              { val: "$348 / yr", label: "Saved vs Synthesia Creator", sub: "LensFlow Pro vs Synthesia Creator" },
              { val: "+4 features", label: "No one else has", sub: "Glamour · Confidence · REA · AUD" },
            ].map((s) => (
              <div key={s.val} className="text-center p-6 rounded-2xl border border-white/8" style={{ background: "rgba(201,154,46,0.04)" }}>
                <p className="text-3xl font-bold mb-1" style={{ color: "#C99A2E" }}>{s.val}</p>
                <p className="font-semibold text-white">{s.label}</p>
                <p className="text-xs text-white/40 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl border border-white/10" style={{ background: "rgba(201,154,46,0.04)" }}>
          <h3 className="text-2xl font-bold mb-3">Our 20% guarantee.</h3>
          <p className="text-white/60 mb-6 leading-relaxed">Show us a comparable quote from <em>any</em> AI video tool and we'll beat it by 20%, <strong className="text-white">locked in for 12 months</strong>.</p>
          <a href="/dashboard" className="inline-block">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
              Start your 7-day free trial
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}