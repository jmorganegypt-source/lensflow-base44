import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PLANS = [
  {
    name: "Starter",
    price: "$79",
    features: ["20 AI Videos per month", "Mia & Oliver presenters", "Basic lip sync", "Teleprompter"],
    cta: "Start 14-day Free Trial",
    href: "https://buy.stripe.com/bJe00jc29bWsa6r2eX2go04",
  },
  {
    name: "Elite",
    price: "$199",
    popular: true,
    features: ["Unlimited AI Videos", "Custom Avatar Training", "Advanced Phoneme Lip Sync", "Priority Rendering", "REA/Domain Export"],
    cta: "Start 14-day Free Trial",
    href: "https://buy.stripe.com/cNi14n1nv2lSemHbPx2go05",
  },
  {
    name: "Concierge",
    price: "$399",
    features: ["Everything in Elite", "White Glove Service", "Dedicated Account Manager", "Voice Cloning", "24hr Turnaround"],
    cta: "Book a Call",
    href: "https://buy.stripe.com/8x27sLfel8Kgcez8Dl2go06",
  },
];

export default function NewPricing() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8f3ea" }}>
      <Navbar />

      <section style={{ paddingTop: "100px", paddingBottom: "100px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div className="max-w-5xl mx-auto">
          <h1 style={{ textAlign: "center", fontSize: "42px", marginBottom: "20px" }}>Simple, Powerful Pricing</h1>
          <p style={{ textAlign: "center", color: "#aaa", maxWidth: "600px", margin: "0 auto 60px" }}>
            Choose the plan that fits your business. All plans include unlimited AI script generation.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-10 border"
                style={{
                  borderColor: plan.popular ? "#C99A2E" : "rgba(255,255,255,0.1)",
                  background: plan.popular ? "rgba(201,154,46,0.06)" : "rgba(255,255,255,0.02)",
                  textAlign: "center",
                }}
              >
                <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
                  {plan.name}
                  {plan.popular && (
                    <span style={{ fontSize: "14px", background: "#C99A2E", color: "#0a0a0a", padding: "2px 10px", borderRadius: "999px", marginLeft: "12px" }}>
                      Most Popular
                    </span>
                  )}
                </h3>
                <p style={{ fontSize: "48px", fontWeight: "800", color: "#C99A2E" }}>
                  {plan.price}
                  <span style={{ fontSize: "18px", color: "#aaa" }}>/mo</span>
                </p>
                <ul style={{ textAlign: "left", lineHeight: "2.2", margin: "30px 0", color: "#aaa" }}>
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <a href={plan.href} target="_blank" rel="noopener noreferrer" className="block">
                  <button
                    className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                    style={plan.popular ? { background: "#C99A2E", color: "#0a0a0a" } : { border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
                  >
                    {plan.cta}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}