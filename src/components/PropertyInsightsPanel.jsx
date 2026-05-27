import { TrendingUp, Users, Calendar, Flame, Lightbulb } from 'lucide-react';

export default function PropertyInsightsPanel({ insights, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-amber-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-amber-100 rounded w-full"></div>
          <div className="h-4 bg-amber-100 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Market Intelligence</h3>
        <p className="text-sm text-gray-600">AI-powered insights to boost your listing</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Market Velocity */}
        <div className="flex gap-3 items-start">
          <Flame className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500">Market Temp</p>
            <p className="text-base font-semibold text-gray-900 capitalize">{insights.market_velocity} Market</p>
          </div>
        </div>

        {/* DOM */}
        <div className="flex gap-3 items-start">
          <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500">Avg Days on Market</p>
            <p className="text-base font-semibold text-gray-900">{insights.average_dom} days</p>
          </div>
        </div>

        {/* Price Appreciation */}
        <div className="flex gap-3 items-start">
          <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500">YoY Appreciation</p>
            <p className="text-base font-semibold text-gray-900">+{insights.price_appreciation}%</p>
          </div>
        </div>

        {/* Demographics */}
        <div className="flex gap-3 items-start">
          <Users className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500">Buyer Profile</p>
            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{insights.buyer_demographics}</p>
          </div>
        </div>
      </div>

      {/* Comps */}
      {insights.comparable_sales?.length > 0 && (
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Recent Comps</p>
          <div className="space-y-2">
            {insights.comparable_sales.slice(0, 3).map((comp, i) => (
              <div key={i} className="flex justify-between items-center text-sm bg-white rounded-lg p-2.5 border border-amber-100">
                <span className="text-gray-700 font-medium">{comp.address}</span>
                <span className="text-green-600 font-bold">${(comp.price / 1e6).toFixed(2)}M</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Script Enhancement */}
      {insights.script_enhancement && (
        <div className="bg-white rounded-lg p-3.5 border border-amber-100">
          <div className="flex gap-2 items-start">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">Script Boost</p>
              <p className="text-sm text-gray-700 italic">"{insights.script_enhancement}"</p>
            </div>
          </div>
        </div>
      )}

      {/* Market Insights */}
      {insights.market_insights && (
        <div className="text-sm text-gray-700 leading-relaxed border-l-2 border-amber-300 pl-3">
          <strong>Market Summary:</strong> {insights.market_insights}
        </div>
      )}
    </div>
  );
}