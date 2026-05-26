import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { suggestion } = await req.json();

    if (!suggestion || suggestion.trim().length === 0) {
      return Response.json({ error: 'Suggestion cannot be empty' }, { status: 400 });
    }

    await base44.integrations.Core.SendEmail({
      to: 'admin@lensflow.com.au',
      subject: `Feature Suggestion from ${user.full_name}`,
      body: `
New feature suggestion submitted:

Rep Name: ${user.full_name}
Rep Email: ${user.email}

Suggestion:
${suggestion}
      `.trim(),
    });

    return Response.json({ success: true, message: 'Thank you for your suggestion!' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});