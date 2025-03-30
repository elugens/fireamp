# Turborepo with shadcn/ui Integration Guide

This document provides a comprehensive overview of how shadcn/ui is integrated into this Turborepo monorepo structure, explaining the architecture, configuration, and best practices for Next.js 15+ and React 19.

## Architecture Overview

This project uses a Turborepo monorepo structure with the following key components:

- **Apps**: Next.js 15+ applications that consume shared UI components
  - `web`: Main Next.js application with Turbopack support
  - `docs`: Documentation site built with Next.js

- **Packages**: Shared libraries and configurations
  - `ui`: Shared UI component library with shadcn/ui components
  - `eslint-config`: Shared ESLint configurations
  - `typescript-config`: Shared TypeScript configurations
  - `tailwind-config`: Shared Tailwind CSS configurations

## shadcn/ui Integration

[shadcn/ui](https://ui.shadcn.com/) is integrated as a component library within the shared `ui` package. This setup allows all applications to use the same UI components while maintaining consistent styling.

### Key Configuration Files

1. **components.json** (in apps/web)
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "new-york",
     "rsc": true,
     "tsx": true,
     "tailwind": {
       "config": "../../packages/ui/tailwind.config.ts",
       "css": "../../packages/ui/src/styles.css",
       "baseColor": "zinc",
       "cssVariables": true
     },
     "iconLibrary": "lucide",
     "aliases": {
       "components": "@/components",
       "hooks": "@/hooks",
       "lib": "@/lib",
       "utils": "@repo/ui/lib/utils",
       "ui": "@repo/ui/components"
     }
   }
   ```

2. **package.json** (in packages/ui)
   ```json
   {
     "name": "@repo/ui",
     "version": "0.0.0",
     "type": "module",
     "sideEffects": [
       "**/*.css"
     ],
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
   }
   ```

## Module Resolution and File Extensions

### ES Modules Configuration

The UI package uses ES Modules (`"type": "module"` in package.json), which is standard for Next.js 15+ and React 19 projects. This affects how imports and exports work:

1. **JS Extension in Imports**: 
   In `packages/ui/src/index.ts`, components and utilities are imported with `.js` extensions:
   ```typescript
   // Export components
   export * from "./components/button.js";
   
   // Export utilities
   export * from "./lib/utils.js";
   ```
   
   This is because when TypeScript compiles `.ts` and `.tsx` files to JavaScript, the imports in the compiled code will reference `.js` files. Using `.js` extensions in the source code ensures compatibility with ES Module standards and proper resolution in both development and production environments.

2. **Package Exports**:
   The `exports` field in `package.json` defines how the package's modules can be imported, controlling what can be imported and how.

## Directory Structure

The UI package follows this structure:

```
packages/ui/
├── src/
│   ├── components/
│   │   └── button.tsx (and other components)
│   ├── lib/
│   │   └── utils.ts
│   └── index.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Build Process

1. **Component Styles**: 
   - Tailwind CSS processes the styles in `packages/ui/src/styles.css`
   - The output is placed in `packages/ui/dist/index.css`
   - Apps import these styles with `import "@repo/ui/styles.css"`

2. **TypeScript Compilation**:
   - Next.js 15+ apps directly consume the TypeScript components
   - This approach simplifies sharing one `tailwind.config.ts` across apps and packages

## Turbopack Integration

Next.js 15+ includes Turbopack, a Rust-based successor to Webpack, which provides significantly faster development experience:

1. **Configuration**:
   In `apps/web/package.json`, the dev script is configured to use Turbopack:
   ```json
   "scripts": {
     "dev": "next dev --port 3000 --turbopack"
   }
   ```

2. **Benefits**:
   - Faster refresh times
   - Improved caching
   - Better error reporting
   - Optimized for monorepo structures

## Import Patterns

1. **Within UI Package**: Use relative imports
   ```tsx
   // In packages/ui/src/components/button.tsx
   import { cn } from "../lib/utils";
   ```

2. **From Apps**: Import from package root or specific exports
   ```tsx
   // Import entire component
   import { Button } from "@repo/ui";
   
   // Import specific utility
   import { cn } from "@repo/ui/lib/utils";
   ```

## React 19 Compatibility

This project uses React 19, which includes several improvements and new features:

1. **Configuration**:
   All apps and packages use React 19:
   ```json
   "dependencies": {
     "react": "^19.0.0",
     "react-dom": "^19.0.0"
   }
   ```

2. **Benefits**:
   - Improved performance
   - Enhanced developer experience
   - Better type safety
   - New hooks and features

## Common Issues and Solutions

1. **Module Resolution Errors**:
   - Ensure paths in import statements match the exports in package.json
   - Use relative paths within the UI package
   - Use package imports from apps

2. **CSS Processing Issues**:
   - Ensure PostCSS config is correctly exported and imported
   - Make sure Tailwind CSS is configured to scan all relevant files

3. **Type Errors**:
   - Ensure TypeScript configurations are consistent across packages
   - Use proper path aliases in tsconfig.json files

4. **Turbopack Issues**:
   - Check for compatibility with installed packages
   - Ensure Next.js configuration is optimized for Turbopack

## Best Practices

1. **Component Development**:
   - Add new shadcn/ui components to the UI package
   - Export them through the central index.ts file
   - Use consistent naming and styling conventions

2. **Application Integration**:
   - Import components from the UI package root
   - Customize components at the application level when needed
   - Share styles through the common Tailwind configuration

3. **Monorepo Management**:
   - Use Turborepo's caching to speed up builds
   - Define clear dependencies between packages
   - Maintain consistent versioning across packages

## Adding New shadcn/ui Components

To add a new shadcn/ui component:

1. Navigate to your app directory: `cd apps/web`
2. Use the shadcn/ui CLI to add a component: `npx shadcn-ui@latest add [component-name]`
3. Move the generated component to the UI package: `packages/ui/src/components/`
4. Update the UI package's index.ts to export the new component with `.js` extension:
   ```typescript
   export * from "./components/new-component.js";
   ```
5. Update any import paths in the component to use relative paths

By following this structure, you maintain a clean separation between shared UI components and application-specific code while leveraging the power of shadcn/ui, Turborepo, Next.js 15+, and React 19.