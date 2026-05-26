import { Link, useLocation } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/7ca147aa6_generated_image.png";

export default function Navbar() {
  const location = useLocation();
  const isApp = location.pathname === "/generate";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/8" style={{ background: "rgba(10,14,26,0.92)", backdropFilter: "blur(20px)" }}>
      <Link to="/" className="flex items-center gap-2.5">
        <span className="text-2xl font-bold" style={{ color: "#C99A2E" }}>LensFlow</span>
      </Link>

      <nav className="hidden md:flex items-center gap-7">
        <Link to="/presenters" className="text-sm text-white/60 hover:text-white transition-colors">Presenters</Link>
        <Link to="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link>
        <Link to="/compare" className="text-sm text-white/60 hover:text-white transition-colors">Compare</Link>
        <Link to="/how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How It Works</Link>
        <a href="https://www.lensflow.com.au/done-for-you" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Done-for-You</a>
        <Link to="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
        <a href="https://www.lensflow.com.au/login" className="text-sm text-white/60 hover:text-white transition-colors">Sign In</a>
        <Link to="/generate">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
            Start Recording
          </button>
        </Link>
      </nav>

      {/* Mobile */}
      <Link to="/generate" className="md:hidden">
        <button className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
          Start Recording
        </button>
      </Link>
    </header>
  );
}