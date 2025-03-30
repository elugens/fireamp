# Troubleshooting Shadcn UI Integration in Turborepo

This guide provides solutions for common issues encountered when integrating Shadcn UI into a Turborepo monorepo structure with Next.js 15+ and React 19.

## Problem: Cannot find module '@repo/ui/lib/utils' or its corresponding type declarations

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
Cannot find module '@repo/ui/lib/utils' or its corresponding type declarations
```

Change the import statement in your component file (e.g., `button.tsx`) from:

```tsx
import { cn } from "@repo/ui/lib/utils"
```

To a relative path within the UI package:

```tsx
import { cn } from "../lib/utils"
```

Make sure the path correctly points to the utils file relative to the component's location.

#### 2. Create an Index File for Centralized Exports

Create or update `packages/ui/src/index.ts` to export all components and utilities with `.js` extensions (required for ES modules):

```typescript
// Export components
export * from "./components/button.js";
// Add other component exports here

// Export utilities
export * from "./lib/utils.js";
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
  "./postcss.config.js": "./postcss.config.js",
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

## Problem: PostCSS Configuration Issues with Next.js 15+

If you encounter errors related to PostCSS configuration when using Shadcn UI in a Turborepo with Next.js 15+:

### ES Modules vs CommonJS Issues

With Next.js 15+ and React 19, ES modules are the standard. If your project uses ES modules (`"type": "module"` in package.json):

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

#### For CommonJS Projects (Legacy):

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

## Problem: Turbopack Compatibility Issues

If you encounter issues with Turbopack in development mode:

### Solution:

1. Make sure your Next.js config is properly set up for Turbopack:

```typescript
// apps/web/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
```

2. Ensure your package.json script uses the Turbopack flag:

```json
"scripts": {
  "dev": "next dev --port 3000 --turbopack"
}
```

## Problem: React 19 Compatibility Issues

If you encounter compatibility issues with React 19:

### Solution:

1. Ensure all React-related packages are updated to compatible versions:

```json
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

2. Update any component libraries that might not be compatible with React 19

## Best Practices for Shadcn UI in Turborepo with Next.js 15+

1. **Use ES modules consistently** across your packages (`"type": "module"` in package.json)
2. **Use .js extensions in imports** within index.ts files even for TypeScript files
3. **Keep utility functions in a dedicated lib directory** for better organization
4. **Use a centralized index.ts file** to export all components and utilities
5. **Properly configure exports in package.json** to ensure all files are accessible
6. **Use relative imports within the UI package** to avoid path resolution issues
7. **Import from the package root in applications** (e.g., `import { Button } from "@repo/ui"`)
8. **Configure components.json correctly** with proper paths to Tailwind config and CSS files

By following these guidelines, you can avoid common issues when integrating Shadcn UI into a Turborepo project with Next.js 15+ and React 19.
