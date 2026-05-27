import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { base44 } from "@/api/base44Client";

const PACKAGES = [
  {
    name: "Prestige Package",
    price: "$1,500",
    description: "48-hour delivery • 4K videos • Professional scripts • Mia & Oliver narration • Social media cuts",
  },
  {
    name: "Signature Package",
    price: "$2,200",
    description: "24-hour priority • Custom AI twin • Voice cloning • Unlimited revisions • Full marketing campaign",
  },
];

export default function Concierge() {
  const handleBookCall = async (packageName) => {
    try {
      const user = await base44.auth.me();
      if (!user) {
        base44.auth.redirectToLogin();
        return;
      }
      // Log analytics
      base44.analytics.track({
        eventName: "concierge_package_interest",
        properties: { package: packageName },
      });
      // In real app, this would open a Calendly or contact form
      alert(`Concierge team will contact you shortly about ${packageName}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8f3ea" }}>
      <Navbar />

      <section style={{ paddingTop: "100px", paddingBottom: "100px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-white" style={{ textAlign: "center", color: "#C99A2E", fontSize: "42px", marginBottom: "12px", fontWeight: "bold" }}>LENSFLOW Concierge</h1>
          <p style={{ textAlign: "center", color: "#aaa", marginBottom: "60px" }}>White-Glove AI Video Production for Elite Agents</p>

          {PACKAGES.map((pkg) => (
            <div key={pkg.name} className="rounded-2xl p-8 border border-white/10 mb-8" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h2 className="text-white" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
                {pkg.name} — <span style={{ color: "#C99A2E" }}>{pkg.price} / month</span>
              </h2>
              <p style={{ color: "#aaa", marginBottom: "24px" }}>{pkg.description}</p>
              <button
                onClick={() => handleBookCall(pkg.name)}
                className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                style={{ background: "#C99A2E", color: "#0a0a0a" }}
              >
                Book {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}