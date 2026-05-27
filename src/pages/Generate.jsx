import { useState } from "react";
import InputScreen from "../components/InputScreen";
import ProgressView from "../components/ProgressView";
import MediaDashboard from "../components/MediaDashboard";
import { base44 } from "@/api/base44Client";

export default function Generate() {
  const [currentView, setCurrentView] = useState("input");
  const [listingUrl, setListingUrl] = useState("");
  const [reelId, setReelId] = useState(null);

  const handleGenerate = (url) => {
    setListingUrl(url);
    setCurrentView("progress");
  };

  const handleComplete = async (script) => {
    // Create with "generating" first, then update to "complete" to fire the automation trigger
    const reel = await base44.entities.Reel.create({ listing_url: listingUrl, status: "generating", script: script || "" });
    setReelId(reel.id);
    setCurrentView("media");
    await base44.entities.Reel.update(reel.id, { status: "complete" });
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="relative z-10">
        {currentView === "input" && <InputScreen onGenerate={handleGenerate} />}
        {currentView === "progress" && (
          <ProgressView listingUrl={listingUrl} onComplete={handleComplete} />
        )}
        {currentView === "media" && (
          <MediaDashboard listingUrl={listingUrl} reelId={reelId} onReset={() => { setListingUrl(""); setCurrentView("input"); setReelId(null); }} />
        )}
      </div>
    </div>
  );
}