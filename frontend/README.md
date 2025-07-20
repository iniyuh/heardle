# Frontend (React App)

This package contains the source code for the Multiplayer Heardle frontend, built with React, Vite, and TypeScript.

## Structure
- `src/components/` - UI components (lobby, game, UI, layout)
- `src/hooks/` - Custom React hooks
- `src/contexts/` - React context providers
- `src/services/` - Client-side services (Socket.IO, audio, game logic)
- `src/types/` - Shared TypeScript types
- `src/utils/` - Utility functions

## Getting Started
See the main project PRD for setup and development instructions.

[../PRD.md](../PRD.md) 

## TypeScript Configuration

This package uses a `tsconfig.json` that extends the root config at the project root. It is set up for React and Vite, and includes all source files in `src/`. Shared types can be imported from the `shared` package. 

## Linting & Formatting

This package uses ESLint and Prettier for code quality and formatting. Run `npm run lint` to check for lint errors and `npm run format` to auto-format code. 