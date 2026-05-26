import { Download, Trash2, RotateCw, Mail, Phone, MapPin } from 'lucide-react';

export default function CustomerCard({ customer, onDelete, onSync, syncing }) {
  const photoCount = customer.photos_urls?.length || 0;
  const videoCount = customer.videos_urls?.length || 0;

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold mb-3" style={{ color: '#0a0e1a' }}>
          {customer.customer_name}
        </h3>
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" style={{ color: '#C99A2E' }} />
            {customer.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" style={{ color: '#C99A2E' }} />
            {customer.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: '#C99A2E' }} />
            {customer.property_address}
          </div>
        </div>
      </div>

      {/* Assets */}
      <div className="p-6 border-b border-slate-200">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Assets</p>
        <div className="space-y-2">
          {photoCount > 0 && (
            <p className="text-sm text-slate-600">
              📷 <strong>{photoCount}</strong> {photoCount === 1 ? 'photo' : 'photos'}
            </p>
          )}
          {videoCount > 0 && (
            <p className="text-sm text-slate-600">
              🎬 <strong>{videoCount}</strong> {videoCount === 1 ? 'video' : 'videos'}
            </p>
          )}
          {photoCount === 0 && videoCount === 0 && (
            <p className="text-sm text-slate-400 italic">No assets yet</p>
          )}
        </div>
      </div>

      {/* HubSpot Status */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">HubSpot</p>
        <p className="text-sm">
          {customer.synced_to_hubspot ? (
            <span style={{ color: '#22c55e' }}>✓ Synced</span>
          ) : (
            <span className="text-slate-500">Not synced</span>
          )}
        </p>
      </div>

      {/* Actions */}
      <div className="p-6 flex gap-2">
        <button
          onClick={onSync}
          disabled={syncing}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium border"
          style={{
            borderColor: '#C99A2E',
            color: '#C99A2E',
            background: 'transparent',
            opacity: syncing ? 0.5 : 1,
          }}
        >
          <RotateCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync HubSpot'}
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 rounded text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}