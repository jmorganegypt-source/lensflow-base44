import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8f3ea" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "100px", textAlign: "center" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h1 style={{ fontSize: "clamp(52px, 8vw, 78px)", fontWeight: "800", lineHeight: "1.05", marginBottom: "28px" }}>
            AI Videos That Sell<br />
            Properties Faster in 2026
          </h1>
          <p style={{ fontSize: "21px", color: "#aaa", maxWidth: "720px", margin: "0 auto 48px" }}>
            Professional 4K listing videos with photoreal AI presenters. No filming required.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/studio">
              <button className="px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
                Open AI Studio →
              </button>
            </Link>
            <Link to="/pricing">
              <button className="px-8 py-4 rounded-full font-semibold border" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                See Pricing
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2026 Trends */}
      <section style={{ padding: "80px 24px", background: "#11181f", margin: "0 -24px" }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ textAlign: "center", marginBottom: "60px", fontSize: "34px" }}>2026 Real Estate Marketing Trends</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div className="rounded-2xl p-6 border border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 style={{ color: "#C99A2E", marginBottom: "12px", fontSize: "18px" }}>AI Avatars &amp; Lip Sync</h3>
              <p style={{ color: "#aaa" }}>Replace hours of filming with professional AI presenters.</p>
            </div>
            <div className="rounded-2xl p-6 border border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 style={{ color: "#C99A2E", marginBottom: "12px", fontSize: "18px" }}>Short-Form Video</h3>
              <p style={{ color: "#aaa" }}>Daily Reels and TikToks drive most leads.</p>
            </div>
            <div className="rounded-2xl p-6 border border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 style={{ color: "#C99A2E", marginBottom: "12px", fontSize: "18px" }}>Personal AI Twins</h3>
              <p style={{ color: "#aaa" }}>Your digital version works 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", background: "#11181f" }}>
        <h2 style={{ fontSize: "42px", marginBottom: "24px" }}>Ready to dominate 2026?</h2>
        <Link to="/studio">
          <button className="px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
            Start Creating Videos Now
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}