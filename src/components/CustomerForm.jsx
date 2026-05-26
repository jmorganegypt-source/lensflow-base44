import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, X } from 'lucide-react';

export default function CustomerForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    property_address: '',
  });
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (e, type) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    for (const file of files) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        if (type === 'photo') {
          setPhotos(prev => [...prev, file_url]);
        } else {
          setVideos(prev => [...prev, file_url]);
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    setUploading(false);
  };

  const removeFile = (url, type) => {
    if (type === 'photo') {
      setPhotos(prev => prev.filter(p => p !== url));
    } else {
      setVideos(prev => prev.filter(v => v !== url));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await base44.entities.Customer.create({
        ...formData,
        photos_urls: photos,
        videos_urls: videos,
      });
      onSuccess();
    } catch (error) {
      console.error('Save failed:', error);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-8">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a0e1a' }}>Create Customer Card</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Customer Name</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none"
            style={{ borderColor: '#e2e8f0' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none"
            style={{ borderColor: '#e2e8f0' }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none"
            style={{ borderColor: '#e2e8f0' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Property Address</label>
          <input
            type="text"
            name="property_address"
            value={formData.property_address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none"
            style={{ borderColor: '#e2e8f0' }}
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Photos</label>
        <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-slate-300 transition-colors" style={{ borderColor: '#C99A2E80' }}>
          <Upload className="w-5 h-5" style={{ color: '#C99A2E' }} />
          <span className="text-sm text-slate-600">Click to upload photos</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e, 'photo')}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {photos.length > 0 && (
          <div className="mt-3 space-y-2">
            {photos.map((url, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                <span className="text-sm text-slate-600 truncate">Photo {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFile(url, 'photo')}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Videos</label>
        <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-slate-300 transition-colors" style={{ borderColor: '#C99A2E80' }}>
          <Upload className="w-5 h-5" style={{ color: '#C99A2E' }} />
          <span className="text-sm text-slate-600">Click to upload videos</span>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => handleFileSelect(e, 'video')}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {videos.length > 0 && (
          <div className="mt-3 space-y-2">
            {videos.map((url, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                <span className="text-sm text-slate-600 truncate">Video {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFile(url, 'video')}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="px-6 py-3 rounded-lg font-semibold text-white"
          style={{ background: '#C99A2E', opacity: saving || uploading ? 0.5 : 1 }}
        >
          {saving ? 'Saving...' : 'Create Card'}
        </button>
      </div>
    </form>
  );
}