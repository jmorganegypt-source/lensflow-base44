# Debug Tools for Technicians

## Quick Lint Check
```bash
npm run lint
```
Catches JSX syntax errors, unused variables, hook issues before they break the build.

## Full Build Test
```bash
npm run build
```
Validates the entire app—catches nested JSX and orphaned closing tags.

## What ESLint Catches
- ✅ Unmatched JSX tags
- ✅ Adjacent JSX elements (forgot wrapper)
- ✅ Unused imports/variables
- ✅ Hook violations (useState outside function, etc.)
- ✅ Missing semicolons, curly brace mismatches
- ✅ Deeply nested JSX structures (over 5 levels)

## Backend Debug Function
```javascript
// Invoke from code:
const res = await base44.functions.invoke('debug', { action: 'lint' });
// Returns tips on running lint locally
```

## Common Culprits
1. `.map()` without closing paren or JSX fragment
2. Orphaned `</div>` or `)}` outside of parent
3. Comments inside JSX without braces: `<!-- comment -->` ❌ vs `{/* comment */}` ✅
4. Conditional render without wrapper: `{a && <X />}{b && <Y />}` ❌ vs wrap in `<>` ✅

## Before Committing
1. Run `npm run lint`
2. Run `npm run build`
3. Check preview for visual issues
4. Commit only if all three pass