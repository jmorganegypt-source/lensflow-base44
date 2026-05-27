import { useState } from "react";
import InputScreen from "../components/InputScreen";
import ProgressView from "../components/ProgressView";
import MediaDashboard from "../components/MediaDashboard";
import PropertyInsightsPanel from "../components/PropertyInsightsPanel";
import { base44 } from "@/api/base44Client";

export default function Generate() {
  const [currentView, setCurrentView] = useState("input");
  const [listingUrl, setListingUrl] = useState("");
  const [reelId, setReelId] = useState(null);
  const [insights, setInsights] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(false);

  const handleGenerate = async (url) => {
    setListingUrl(url);
    setCurrentView("insights");
    setInsightsLoading(true);
    try {
      const result = await base44.functions.invoke('getPropertyInsights', {
        listingUrl: url,
        propertyAddress: url.split('/').filter(p => p).pop()
      });
      setInsights(result.data);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
      setInsights(null);
    }
    setInsightsLoading(false);
  };

  const handleComplete = async (script) => {
    try {
      // Create with "generating" first, then update to "complete" to fire the automation trigger
      const reel = await base44.entities.Reel.create({ listing_url: listingUrl, status: "generating", script: script || "" });
      setReelId(reel.id);
      setCurrentView("media");
      await base44.entities.Reel.update(reel.id, { status: "complete" });
    } catch (error) {
      console.error('Failed to create reel:', error);
      alert('Error creating reel. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <div className="relative z-10">
        {currentView === "input" && <InputScreen onGenerate={handleGenerate} />}
        {currentView === "insights" && (
          <div className="max-w-4xl mx-auto p-8">
            <PropertyInsightsPanel insights={insights} isLoading={insightsLoading} />
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setCurrentView("progress")}
                className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Generate Reel with Insights
              </button>
              <button
                onClick={() => setCurrentView("input")}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
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