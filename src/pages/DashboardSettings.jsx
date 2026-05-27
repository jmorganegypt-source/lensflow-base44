import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { User, Save, Building2, Phone } from "lucide-react";

export default function DashboardSettings() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setName(u?.full_name || "");
      setAgency(u?.agency_name || "");
      setPhone(u?.phone || "");
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe({ full_name: name, agency_name: agency, phone });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage your account preferences.</p>
      </div>

      <div className="rounded-2xl p-6 border border-white/8 space-y-5" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(201,154,46,0.12)" }}>
            <User className="w-5 h-5 text-[#C99A2E]" />
          </div>
          <p className="text-white font-semibold">Profile</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/40 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-[#C99A2E]/40 transition-colors"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/40 uppercase tracking-wider">Agency Name</label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              placeholder="e.g. Ray White Sydney"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-[#C99A2E]/40 transition-colors placeholder:text-white/20"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/40 uppercase tracking-wider">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0400 000 000"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-[#C99A2E]/40 transition-colors placeholder:text-white/20"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-white/40 uppercase tracking-wider">Email</label>
          <input
            type="text"
            value={user?.email || ""}
            disabled
            className="w-full px-4 py-2.5 rounded-xl text-sm text-white/40 border border-white/6 cursor-not-allowed"
            style={{ background: "rgba(255,255,255,0.02)" }}
          />
          <p className="text-xs text-white/25">Email cannot be changed here.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "#C99A2E", color: "#0a0e1a" }}
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}