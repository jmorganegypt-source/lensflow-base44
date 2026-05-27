import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BatchUpload() {
  const [file, setFile] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setError(null);

    try {
      // Parse CSV/Excel file
      const text = await f.text();
      const lines = text.split('\n').filter((l) => l.trim());
      const extractedUrls = lines
        .map((line) => {
          const cols = line.split(',');
          return cols[0]?.trim() || cols[1]?.trim() || '';
        })
        .filter((url) => url && (url.startsWith('http') || url.includes('listing')));

      if (extractedUrls.length === 0) {
        setError('No valid URLs found in file');
        return;
      }

      setUrls(extractedUrls);
    } catch (err) {
      setError(`Error parsing file: ${err.message}`);
    }
  };

  const handleBatchGenerate = async () => {
    if (urls.length === 0) {
      setError('No URLs to generate');
      return;
    }

    setLoading(true);
    setResults([]);
    const batchResults = [];

    for (let i = 0; i < urls.length; i++) {
      try {
        const res = await base44.functions.invoke('generateVideo', {
          listingUrl: urls[i],
        });
        batchResults.push({
          url: urls[i],
          status: 'queued',
          reelId: res.data?.reelId || 'pending',
        });
      } catch (err) {
        batchResults.push({
          url: urls[i],
          status: 'failed',
          error: err.message,
        });
      }
    }

    setResults(batchResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0e1a', color: '#f8f3ea' }}>
      <Navbar />

      <section style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="max-w-2xl mx-auto">
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>Batch Upload Reels</h1>
          <p style={{ color: '#aaa', marginBottom: '40px' }}>Upload a CSV or spreadsheet with listing URLs to generate multiple reels at once.</p>

          {/* File Upload */}
          <div className="rounded-2xl p-8 border border-white/10 mb-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div
              onClick={() => document.getElementById('fileInput').click()}
              className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-yellow-600 transition-colors"
              style={{ borderColor: '#555' }}
            >
              <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: '#C99A2E' }} />
              <p style={{ color: 'white', fontWeight: 'bold', marginBottom: '6px' }}>Upload CSV or Excel file</p>
              <p style={{ color: '#aaa', fontSize: '14px' }}>Column 1: Listing URL or Domain listing link</p>
              <input type="file" id="fileInput" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} className="hidden" />
            </div>

            {error && (
              <div className="mt-4 p-4 rounded-lg flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p style={{ color: '#fca5a5' }}>{error}</p>
              </div>
            )}

            {urls.length > 0 && (
              <div className="mt-6">
                <p style={{ color: 'white', fontWeight: 'bold', marginBottom: '12px' }}>
                  {urls.length} URL{urls.length !== 1 ? 's' : ''} found:
                </p>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {urls.map((url, i) => (
                    <div key={i} className="text-sm text-white/60 py-1 border-b border-white/5">
                      {i + 1}. {url}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {urls.length > 0 && (
            <button
              onClick={handleBatchGenerate}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              style={{ background: loading ? '#999' : '#C99A2E', color: '#0a0a0a' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating {results.length} / {urls.length}...
                </>
              ) : (
                `Generate ${urls.length} Reel${urls.length !== 1 ? 's' : ''}`
              )}
            </button>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-8 rounded-2xl p-8 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ color: 'white', fontWeight: 'bold', marginBottom: '16px' }}>Generation Results</h3>
              <div className="space-y-2">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-white/5">
                    {r.status === 'queued' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{r.url}</p>
                      <p className="text-xs text-white/40">{r.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}