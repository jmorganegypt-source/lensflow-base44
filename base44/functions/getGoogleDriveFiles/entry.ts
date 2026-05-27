import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googledrive');
    const headers = { Authorization: `Bearer ${accessToken}` };

    // Search for video and image files in Google Drive
    const mimeTypes = [
      'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo',
      'image/jpeg', 'image/png', 'image/webp'
    ];
    const mimeQuery = mimeTypes.map(m => `mimeType='${m}'`).join(' or ');
    const q = `(${mimeQuery}) and trashed=false`;

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,webContentLink)&pageSize=50`,
      { headers }
    );

    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch files from Google Drive' }, { status: 500 });
    }

    const data = await response.json();
    const files = (data.files || []).map(f => ({
      id: f.id,
      name: f.name,
      type: f.mimeType.startsWith('video') ? 'video' : 'image',
      url: f.webContentLink,
      mimeType: f.mimeType,
    }));

    return Response.json({ success: true, files });
  } catch (error) {
    console.error('getGoogleDriveFiles error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});