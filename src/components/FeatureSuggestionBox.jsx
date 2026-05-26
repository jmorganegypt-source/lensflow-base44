import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function FeatureSuggestionBox() {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await base44.functions.invoke('submitFeatureSuggestion', { suggestion });
      setSuggestion('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-bold mb-2" style={{ color: '#0a0e1a' }}>
        💡 Feature Suggestion Box
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        Tell us what features you'd like to see in LensFlow.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="What feature would help you most?"
          disabled={loading}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none resize-none"
          rows="4"
        />

        <button
          type="submit"
          disabled={loading || !suggestion.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-opacity"
          style={{
            background: '#C99A2E',
            opacity: loading || !suggestion.trim() ? 0.5 : 1,
          }}
        >
          <Send className="w-4 h-4" />
          {loading ? 'Sending...' : 'Send Suggestion'}
        </button>

        {submitted && (
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-sm text-green-700">
            <CheckCircle className="w-4 h-4" />
            Thanks for your feedback!
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-sm text-red-700">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </form>
    </div>
  );
}