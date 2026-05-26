import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CreditCard, ExternalLink, CheckCircle2, Zap, Star, Crown } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "$79/mo",
    description: "Perfect for solo agents getting started with AI reels.",
    features: ["10 reels/month", "Mia AI presenter", "9:16 format", "Email support"],
    href: "https://buy.stripe.com/bJe00jc29bWsa6r2eX2go04",
    icon: Zap,
    color: "#60a5fa",
  },
  {
    name: "Elite",
    price: "$199/mo",
    description: "For active agents who need volume and premium branding.",
    features: ["50 reels/month", "All 5 AI presenters", "Custom branding", "Priority support"],
    href: "https://buy.stripe.com/cNi14n1nv2lSemHbPx2go05",
    icon: Star,
    color: "#C99A2E",
    popular: true,
  },
  {
    name: "Concierge",
    price: "$399/mo",
    description: "White-glove service with your own AI voice clone.",
    features: ["Unlimited reels", "Custom voice clone", "Dedicated account manager", "Done-for-you option"],
    href: "https://buy.stripe.com/8x27sLfel8Kgcez8Dl2go06",
    icon: Crown,
    color: "#a78bfa",
  },
];

export default function Billing() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser);
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-white/40 text-sm mt-1">Manage your LensFlow subscription.</p>
      </div>

      {/* Current plan info */}
      <div className="rounded-2xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(201,154,46,0.12)" }}>
              <CreditCard className="w-5 h-5 text-[#C99A2E]" />
            </div>
            <div>
              <p className="text-white font-semibold">Your Subscription</p>
              <p className="text-white/40 text-sm mt-0.5">{user?.email}</p>
            </div>
          </div>
          <a href="https://billing.stripe.com/p/login/test_00000" target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-white/12 text-white/70 hover:border-white/25 hover:text-white transition-all">
              <ExternalLink className="w-4 h-4" />
              Manage in Stripe
            </button>
          </a>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-white font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map(({ name, price, description, features, href, icon: Icon, color, popular }) => (
            <div key={name} className={`rounded-2xl p-5 border flex flex-col ${popular ? "border-[#C99A2E]/40" : "border-white/8"}`} style={{ background: popular ? "rgba(201,154,46,0.06)" : "rgba(255,255,255,0.03)" }}>
              {popular && (
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full self-start mb-3" style={{ background: "#C99A2E", color: "#0a0e1a" }}>Most Popular</span>
              )}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <p className="text-white font-semibold">{name}</p>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{price}</p>
              <p className="text-white/40 text-xs mb-4">{description}</p>
              <ul className="space-y-2 flex-1 mb-5">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 ${popular ? "" : "border border-white/12 text-white hover:border-white/25"}`} style={popular ? { background: "#C99A2E", color: "#0a0e1a" } : {}}>
                  Subscribe
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Done for you */}
      <div className="rounded-2xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white font-semibold">Done-for-You Service</p>
            <p className="text-white/40 text-sm mt-1">Let the LensFlow team handle everything. Starting from $399.</p>
          </div>
          <a href="https://buy.stripe.com/aFaeVdaY59OkfqL7zh2go07" target="_blank" rel="noopener noreferrer">
            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white hover:border-white/30 transition-all">
              Book a Session
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}