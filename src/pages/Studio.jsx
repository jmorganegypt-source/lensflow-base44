import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Video, Zap, Users } from "lucide-react";

export default function Studio() {
  const paths = [
    {
      id: "record",
      title: "Record Yourself",
      description: "Use our teleprompter to record yourself presenting the property. Perfect for building your personal brand.",
      icon: Video,
      href: "/studio/record",
      color: "bg-blue-50 border-blue-200",
      accent: "#3b82f6",
    },
    {
      id: "ai",
      title: "AI Presenter",
      description: "Paste a listing URL. Let Mia generate a professional script, voice, and video in 60 seconds.",
      icon: Zap,
      href: "/generate",
      color: "bg-amber-50 border-amber-200",
      accent: "#f59e0b",
    },
    {
      id: "twin",
      title: "Digital Twin",
      description: "Choose Mia or Oliver as your AI presenter. Customize voice tone, style, and message.",
      icon: Users,
      href: "/studio/twin",
      color: "bg-purple-50 border-purple-200",
      accent: "#a855f7",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Choose Your <span style={{ color: "#C99A2E" }}>Studio Path</span>
        </h1>
        <p className="text-lg text-[#0F1A2E]/60 max-w-2xl mx-auto">
          Three ways to create professional property videos. Pick what works best for you.
        </p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <Link key={path.id} to={path.href}>
                  <div className={`h-full rounded-2xl border-2 p-8 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${path.color}`}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: `${path.accent}20` }}>
                      <Icon className="w-6 h-6" style={{ color: path.accent }} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">{path.title}</h2>
                    <p className="text-sm text-[#0F1A2E]/60 leading-relaxed">{path.description}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium" style={{ color: path.accent }}>
                      Get started →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}