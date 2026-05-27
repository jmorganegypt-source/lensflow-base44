import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { action } = await req.json();

    if (action === 'lint') {
      return Response.json({
        status: 'success',
        message: 'Run this locally to check for issues:',
        commands: [
          'npm run lint -- --format json > lint-report.json',
          'npm run build'
        ],
        tips: [
          'Check for "Parsing error" or "Adjacent JSX elements"',
          'Look for unclosed tags or orphaned closing braces',
          'Watch for deeply nested JSX (>5 levels)',
          'Ensure all .map() calls are properly closed'
        ]
      });
    }

    if (action === 'check-syntax') {
      return Response.json({
        status: 'success',
        message: 'ESLint config active. Run:',
        command: 'npm run lint src/pages',
        description: 'Scans all pages for structural issues'
      });
    }

    return Response.json({ error: 'Unknown action', available: ['lint', 'check-syntax'] }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});