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
    <div className="min-h-screen bg-[#f5f0e8]">
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