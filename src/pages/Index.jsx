import { useState } from "react";
import InputScreen from "../components/InputScreen";
import ProgressView from "../components/ProgressView";
import MediaDashboard from "../components/MediaDashboard";

export default function Index() {
  const [currentView, setCurrentView] = useState("input");
  const [listingUrl, setListingUrl] = useState("");

  const handleGenerate = (url) => {
    setListingUrl(url);
    setCurrentView("progress");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0e1a]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>
      <div className="relative z-10">
        {currentView === "input" && <InputScreen onGenerate={handleGenerate} />}
        {currentView === "progress" && (
          <ProgressView listingUrl={listingUrl} onComplete={() => setCurrentView("media")} />
        )}
        {currentView === "media" && (
          <MediaDashboard listingUrl={listingUrl} onReset={() => { setListingUrl(""); setCurrentView("input"); }} />
        )}
      </div>
    </div>
  );
}