import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';

export default function PropertyEngagementSummary() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const insights = await base44.entities.PropertyInsights.list('-updated_date', 50);
        const reels = await base44.entities.Reel.list('-created_date', 100);

        // Merge insights with reel count
        const merged = insights.map((p) => {
          const reelCount = reels.filter((r) => r.property_address === p.property_address).length;
          return {
            ...p,
            reelCount,
          };
        });

        setProperties(merged.sort((a, b) => (b.average_dom || 0) - (a.average_dom || 0)));
      } catch (err) {
        console.error('Error fetching engagement data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-[#C99A2E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th className="text-left p-4 text-white/50 font-semibold">Property</th>
              <th className="text-center p-4 text-white/50 font-semibold">Market</th>
              <th className="text-center p-4 text-white/50 font-semibold">Avg DOM</th>
              <th className="text-center p-4 text-white/50 font-semibold">YoY %</th>
              <th className="text-center p-4 text-white/50 font-semibold">Reels</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-white/40">
                  No property data yet. Generate some reels to see engagement metrics.
                </td>
              </tr>
            ) : (
              properties.map((p) => (
                <tr key={p.id} className="border-t border-white/5 hover:bg-white/2 transition-colors">
                  <td className="p-4 text-white/70">{p.property_address}</td>
                  <td className="p-4 text-center">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background:
                          p.market_velocity === 'hot'
                            ? 'rgba(34,197,94,0.2)'
                            : p.market_velocity === 'balanced'
                              ? 'rgba(59,130,246,0.2)'
                              : 'rgba(100,116,139,0.2)',
                        color:
                          p.market_velocity === 'hot'
                            ? '#22c55e'
                            : p.market_velocity === 'balanced'
                              ? '#3b82f6'
                              : '#64748b',
                      }}
                    >
                      {p.market_velocity || 'N/A'}
                    </span>
                  </td>
                  <td className="p-4 text-center text-white">{p.average_dom || 'N/A'} days</td>
                  <td className="p-4 text-center text-white">{p.price_appreciation ? `+${p.price_appreciation}%` : 'N/A'}</td>
                  <td className="p-4 text-center text-white/60">{p.reelCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}