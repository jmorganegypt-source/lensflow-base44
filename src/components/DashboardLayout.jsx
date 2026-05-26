import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Film, CreditCard, Settings, LogOut, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { base44 } from "@/api/base44Client";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/da745320e_logo-lensflow-mark.png";

const NAV = [
  { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { label: "My Reels", icon: Film, path: "/dashboard/reels" },
  { label: "Generate", icon: Zap, path: "/generate" },
  { label: "Billing", icon: CreditCard, path: "/dashboard/billing" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => base44.auth.logout("/");

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/8">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <img src={LOGO} alt="LensFlow" className="h-8 w-auto" />
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ label, icon: Icon, path }) => {
          const active = path === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "text-[#0a0e1a] bg-[#C99A2E]"
                  : "text-white/60 hover:text-white hover:bg-white/6"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/6 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ background: "#0a0e1a" }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-white/8 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b border-white/8" style={{ background: "#0a0e1a" }}>
        <img src={LOGO} alt="LensFlow" className="h-7 w-auto" />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/60 hover:text-white">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40" style={{ background: "#0a0e1a" }}>
          <div className="pt-14 h-full">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-14">
        <Outlet />
      </main>
    </div>
  );
}