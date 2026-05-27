import { Link } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/0f329563c_generated_image.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-12 px-8" style={{ background: "#0a0e1a" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="space-y-3">
            <img src={LOGO} alt="LensFlow" className="h-9 w-auto" />
            <p className="text-sm text-white/40 max-w-xs">Australia's #1 AI Real Estate Media Platform. Sydney · London · Dubai.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <p className="text-white/30 font-mono uppercase tracking-widest text-xs">Product</p>
              <div className="space-y-2">
                <Link to="/presenters" className="block text-white/60 hover:text-white transition-colors">Presenters</Link>
                <Link to="/pricing" className="block text-white/60 hover:text-white transition-colors">Pricing</Link>
                <Link to="/compare" className="block text-white/60 hover:text-white transition-colors">Compare</Link>
                <Link to="/generate" className="block text-white/60 hover:text-white transition-colors">Generate Reel</Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-white/30 font-mono uppercase tracking-widest text-xs">Platform</p>
              <div className="space-y-2">
                <Link to="/dashboard" className="block text-white/60 hover:text-white transition-colors">Start Trial</Link>
                <Link to="/generate" className="block text-white/60 hover:text-white transition-colors">Done-for-You</Link>
                <Link to="/dashboard" className="block text-white/60 hover:text-white transition-colors">Sign In</Link>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-white/30 font-mono uppercase tracking-widest text-xs">Legal</p>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-white/60 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 LensFlow Pty Ltd. All rights reserved. GST inclusive · ABN issued.</p>
          <p className="text-xs text-white/30">Built in Sydney, Australia 🇦🇺</p>
        </div>
      </div>
    </footer>
  );
}