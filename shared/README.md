# Shared Types & Utilities

This package contains TypeScript types and utility functions shared between the frontend and backend of Multiplayer Heardle.

## Structure
- `types/` - Shared entity and event types (game, player, lobby, socket)
- `utils/` - Shared utility functions (game rules, scoring)

## Usage
Import shared types and utilities in both frontend and backend packages as needed.

See the main project PRD for more details.

[../PRD.md](../PRD.md) 

## TypeScript Configuration

This package uses a `tsconfig.json` that extends the root config at the project root. It is set up to emit type declarations (`.d.ts`) and output compiled files to `dist/` for use in both frontend and backend.

- Shared types should go in `shared/types/`
- Shared utilities should go in `shared/utils/`
- Both frontend and backend can import from this package for type safety and code reuse.

To add new shared types or utilities, simply add files to the appropriate folder and ensure they are included in the `include` array in `tsconfig.json`. 

## Linting & Formatting

This package uses ESLint and Prettier for code quality and formatting. Run `npm run lint` to check for lint errors and `npm run format` to auto-format code. 