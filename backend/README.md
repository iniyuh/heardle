# Backend (Firebase Functions)

This package contains the backend code for Multiplayer Heardle, implemented as Firebase Functions using Node.js and TypeScript.

## Structure
- `src/services/` - Core backend services (Lobby, Game, Music, Scoring)
- `src/models/` - Data models (Lobby, Player, GameSession, Track, Guess)
- `src/socket/` - Socket.IO server and event handlers
- `src/utils/` - Utility functions
- `src/types/` - Backend-specific types

## Deployment
See the main project PRD for deployment and configuration instructions.

[../PRD.md](../PRD.md) 

## TypeScript Configuration

This package uses a `tsconfig.json` that extends the root config at the project root. It includes all backend source files in `src/` and references shared types from the `shared` package. 

## Linting & Formatting

This package uses ESLint and Prettier for code quality and formatting. Run `npm run lint` to check for lint errors and `npm run format` to auto-format code. 