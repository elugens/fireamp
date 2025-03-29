# Troubleshooting Shadcn UI Integration in Turborepo

This guide provides solutions for common issues encountered when integrating Shadcn UI into a Turborepo monorepo structure.

## Problem: Cannot find module '@repo/ui/src/utils' or its corresponding type declarations

This error typically occurs when there's a path resolution issue between your UI components and utility functions in a shared UI package. The error indicates that TypeScript cannot locate the module specified in the import statement.

### Root Causes

1. **Incorrect import paths**: Using absolute paths when relative paths are needed
2. **Missing exports in package.json**: The UI package doesn't properly export the utility functions
3. **Missing index.ts file**: No central export file to re-export utilities
4. **Directory structure mismatch**: The actual file location doesn't match the import path

### Step-by-Step Solution

#### 1. Fix Import Paths in Components

If you see an error like:
```
Cannot find module '@repo/ui/src/utils' or its corresponding type declarations
```

Change the import statement in your component file (e.g., `button.tsx`) from:

```tsx
import { cn } from "@repo/ui/src/utils"
```

To a relative path:

```tsx
import { cn } from "../lib/utils"
```

Make sure the path correctly points to the utils file relative to the component's location.

#### 2. Create an Index File for Centralized Exports

Create or update `packages/ui/src/index.ts` to export all components and utilities:

```typescript
// Export components
export * from "./components/button";
// Add other component exports here

// Export utilities
export * from "./lib/utils";
```

#### 3. Update Package.json Exports

Ensure your UI package's `package.json` correctly exports all necessary paths:

```json
"exports": {
  ".": {
    "types": "./src/index.ts",
    "import": "./src/index.ts"
  },
  "./styles.css": "./dist/index.css",
  "./lib/utils": "./src/lib/utils.ts",
  "./components/*": "./src/components/*.tsx",
  "./*": "./src/*.tsx"
}
```

#### 4. Verify Directory Structure

Ensure your UI package has the following structure:

```
packages/ui/
├── src/
│   ├── components/
│   │   └── button.tsx (and other components)
│   ├── lib/
│   │   └── utils.ts
│   └── index.ts
├── package.json
└── ...
```

#### 5. Build the UI Package

After making these changes, rebuild the UI package:

```bash
cd packages/ui
pnpm run build
```

## Problem: PostCSS Configuration Issues

If you encounter errors related to PostCSS configuration when using Shadcn UI in a Turborepo:

### ES Modules vs CommonJS Issues

If your project uses ES modules (`"type": "module"` in package.json) but your PostCSS config uses CommonJS syntax:

#### For ES Module Projects:

1. Update `apps/web/postcss.config.js`:
```javascript
import postcssConfig from "@repo/ui/postcss.config.js";

export default postcssConfig;
```

2. Update `packages/ui/postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### For CommonJS Projects:

1. Update `apps/web/postcss.config.js`:
```javascript
module.exports = require("@repo/ui/postcss.config.js");
```

2. Update `packages/ui/postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

3. Make sure the UI package exports the postcss.config.js file in package.json:
```json
"exports": {
  // other exports...
  "./postcss.config.js": "./postcss.config.js"
}
```

## Best Practices for Shadcn UI in Turborepo

1. **Use consistent module systems** across your packages (either all ES modules or all CommonJS)
2. **Keep utility functions in a dedicated lib directory** for better organization
3. **Use a centralized index.ts file** to export all components and utilities
4. **Properly configure exports in package.json** to ensure all files are accessible
5. **Use relative imports within the UI package** to avoid path resolution issues
6. **Import from the package root in applications** (e.g., `import { Button } from "@repo/ui"`)

By following these guidelines, you can avoid common issues when integrating Shadcn UI into a Turborepo project.
