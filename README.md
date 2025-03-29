# FireAmp - Turborepo with Tailwind and shadcn/ui

This project is built using Turborepo with Tailwind CSS and shadcn/ui integration for consistent, beautiful UI components across multiple applications.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: Main [Next.js](https://nextjs.org/) application with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- `docs`: Documentation [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: A shared React component library with [shadcn/ui](https://ui.shadcn.com/) components used by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tailwind-config`: Shared Tailwind CSS configuration

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v8.15.6 or newer)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fireamp.git
cd fireamp

# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server for all apps
pnpm dev

# Start a specific app
pnpm --filter web dev
pnpm --filter docs dev
```

### Build

```bash
# Build all apps and packages
pnpm build

# Build a specific app
pnpm --filter web build
```

## Architecture

This project uses a monorepo structure powered by [Turborepo](https://turbo.build/) with the following key features:

- **Shared UI Components**: All UI components are centralized in the `ui` package using shadcn/ui
- **Consistent Styling**: Shared Tailwind configuration ensures consistent styling across apps
- **Type Safety**: Comprehensive TypeScript configurations for maximum type safety
- **Fast Builds**: Turborepo's caching speeds up builds by avoiding redundant work

## shadcn/ui Integration

This project uses [shadcn/ui](https://ui.shadcn.com/) for its component library. shadcn/ui provides high-quality, customizable React components built on Radix UI primitives.

Key features of our shadcn/ui integration:

- **Centralized Components**: All shadcn/ui components are maintained in the `ui` package
- **ES Module Support**: The UI package uses ES Modules with proper `.js` extension handling
- **Consistent Theming**: Shared color schemes and design tokens across all applications
- **Customizability**: Components can be customized at the application level when needed

For detailed information about the shadcn/ui integration, see [turbo-shad-setup.md](./turbo-shad-setup.md).

## Authentication

FireAmp uses [Supabase](https://supabase.com/) for authentication with the following features:

- **Session Management**: Proper handling of authentication sessions across page loads
- **Protected Routes**: Middleware-based protection for authenticated routes
- **Environment-Specific Clients**: Separate Supabase clients for server and browser environments

## Troubleshooting

If you encounter issues with the shadcn/ui integration, refer to [troubleshooting-shadcn-ui-integration.md](./troubleshooting-shadcn-ui-integration.md) for common solutions.

## Utilities

This Turborepo has some additional tools already set up for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## License

MIT
