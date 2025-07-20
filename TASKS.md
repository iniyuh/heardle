# Project Tasks: Multiplayer Heardle

This file tracks macro-level tasks for building Multiplayer Heardle, based on the PRD. Tasks are grouped by major project phases/features. Mark tasks as complete by checking the box.

---

## Phase 1: Project Setup

### 1.1 Firebase Project & Environment Variables
- [x] **1.1a [User]** Create a new Firebase project at https://console.firebase.google.com/
- [x] **1.1b [User]** Enable Firestore and Firebase Functions in the Firebase console
- [x] **1.1c [User]** Generate a Firebase service account and download credentials (for backend use)
    - [x] Go to the Firebase Console > Project Settings > Service Accounts
    - [x] Click "Generate new private key"
    - [x] Download the generated JSON file
    - [x] Store the JSON file securely (do not commit to version control)
    - [x] Note the location for use in backend configuration
- [x] **1.1d [User]** Add your Firebase project ID, client email, and private key to `.env.example` and create a local `.env` file
    - [x] Open the downloaded service account JSON file
    - [x] Copy the `project_id` value and add it to `.env.example` as `FIREBASE_PROJECT_ID=`
    - [x] Copy the `client_email` value and add it to `.env.example` as `FIREBASE_CLIENT_EMAIL=`
    - [x] Copy the `private_key` value and add it to `.env.example` as `FIREBASE_PRIVATE_KEY=` (wrap in double quotes if multiline)
    - [x] Create a `.env` file locally and copy these values from `.env.example`
    - [x] Ensure `.env` is in your `.gitignore`
- [x] **1.1e [User]** Obtain a YouTube Data API v3 key from https://console.developers.google.com/
    - [x] Go to https://console.developers.google.com/
    - [x] Select your Firebase project
    - [x] In the left sidebar, click "APIs & Services" > "Library"
    - [x] Search for "YouTube Data API v3" and click on it
    - [x] Click "Enable"
    - [x] Go to "Credentials" in the sidebar
    - [x] Click "Create Credentials" > "API key"
    - [x] Copy the generated API key for use in your environment variables
- [x] **1.1f [User]** Add your YouTube API key to `.env.example` and your local `.env` file
    - [x] Open your `.env.example` file in the project root
    - [x] Add a line: `YOUTUBE_API_KEY=your-youtube-api-key-here` (use a placeholder, not your real key)
    - [x] Open (or create) your local `.env` file (should be gitignored)
    - [x] Add a line: `YOUTUBE_API_KEY=your-actual-youtube-api-key`
    - [x] Save both files
- [x] **1.1g [AI]** Document required environment variables in `.env.example` (Firebase, YouTube, Socket.IO CORS)
    - [x] List all required Firebase variables with placeholder/example values
    - [x] List the YouTube API key variable with a placeholder value
    - [x] Add a placeholder for Socket.IO CORS origins (e.g., `SOCKET_IO_CORS_ORIGIN=http://localhost:3000`)
    - [x] Add comments above each section explaining what each variable is for
    - [x] Ensure `.env.example` is up to date and clear for new developers

### 1.2 Monorepo Structure
- [x] **1.2a [AI]** Scaffold the following folder structure:
  - `frontend/` (React app)
  - `backend/` (Firebase Functions)
  - `shared/` (shared types/utilities)
- [x] **1.2b [AI]** Add placeholder `README.md` files in each package
    - [x] Create `frontend/README.md` describing the React app, its structure, and how to get started
    - [x] Create `backend/README.md` describing the Firebase Functions backend, its structure, and deployment notes
    - [x] Create `shared/README.md` describing shared types and utilities, and how to use them in both frontend and backend
    - [x] In each README, include a section for directory structure and a link/reference to the main project PRD

### 1.3 Dependency Installation
- [x] **1.3a [AI]** Initialize `package.json` in root, `frontend/`, and `backend/`
- [x] **1.3b [AI]** Install React, Vite, Tailwind CSS, TypeScript, and related dependencies in `frontend/`
- [x] **1.3c [AI]** Install Express, Socket.IO, Firebase Functions, ytdl-core, TypeScript, and related dependencies in `backend/`
- [x] **1.3d [AI]** Set up `shared/` with TypeScript config for shared types

### 1.4 TypeScript & Linting
- [x] **1.4a [AI]** Configure TypeScript in all packages (tsconfig.json)
    - [x] **1.4a.1** Create a root `tsconfig.json` that provides base config for all packages (extends recommended settings, sets strict mode, target, module resolution)
    - [x] **1.4a.2** Ensure each package (`frontend/`, `backend/`, `shared/`) has its own `tsconfig.json` extending the root config
    - [x] **1.4a.3** In `shared/`, enable `declaration` and `composite` for type sharing; output to `dist/`
    - [x] **1.4a.4** In `frontend/` and `backend/`, reference `shared` types via `paths` or project references
    - [x] **1.4a.5** Use `strict: true`, `esModuleInterop: true`, and appropriate `target`/`module` for each environment
    - [x] **1.4a.6** Ensure all source files and type folders (e.g., `src/`, `types/`, `utils/`) are included
    - [x] **1.4a.7** Document the TypeScript setup in each package's README
    - [x] **1.4a.8** (Optional) Add project references for faster builds and type safety across packages
- [x] **1.4b [AI]** Set up ESLint and Prettier for consistent code style in all packages
- [x] **1.4c [AI]** Add basic lint and format scripts to each `package.json`

---

## Phase 2: Lobby System

### 2.0 Shared Types: Core Entities
- [x] **2.0a.1 [Shared]** Create Player model/type in shared/types/player.ts (fields: id, name, lobbyId, score, isReady, isHost, avatar?, joinedAt, lastSeen)
    - [x] Delete the placeholder Player interface from shared/types/lobby.ts after creating the real Player type
- [x] **2.0a.1 [Shared]** Create Lobby model/type in shared/types/lobby.ts (fields: id, name, hostId, players, settings, status, createdAt, updatedAt)
- [x] **2.0a.3 [Shared]** Create Track model/type in shared/types/game.ts
- [x] **2.0a.4 [Shared]** Create Guess model/type in shared/types/game.ts

### 2.1 Backend: Lobby Service & Firestore
- [ ] **2.1a [Backend]** Implement LobbyService (CRUD operations for lobbies)
    - [ ] **2.1a.1 [Backend]** Create Lobby model (fields: id, name, hostId, players, settings, status, createdAt, updatedAt)
    - [ ] **2.1a.2 [Backend]** Implement create, read, update, delete lobby functions
    - [ ] **2.1a.3 [Firestore]** Add Firestore integration for lobby persistence
    - [ ] **2.1a.4 [Test]** Write unit tests for LobbyService
- [ ] **2.1b [Backend]** Implement player management within lobbies
    - [ ] **2.1b.1 [Backend]** Add/Remove player from lobby
    - [ ] **2.1b.2 [Backend]** Update player ready status and host status
    - [ ] **2.1b.3 [Backend]** Handle player disconnects and lobby cleanup
    - [ ] **2.1b.4 [Test]** Write unit tests for player management

### 2.2 Backend: Socket.IO Lobby Events
- [ ] **2.2a [Socket.IO]** Implement Socket.IO event handlers for lobby
    - [ ] **2.2a.1 [Socket.IO]** 'lobby:create' (create lobby)
    - [ ] **2.2a.2 [Socket.IO]** 'lobby:join' (join lobby)
    - [ ] **2.2a.3 [Socket.IO]** 'lobby:leave' (leave lobby)
    - [ ] **2.2a.4 [Socket.IO]** 'lobby:start-game' (start game)
    - [ ] **2.2a.5 [Socket.IO]** 'lobby:update-settings' (update lobby settings)
    - [ ] **2.2a.6 [Socket.IO]** 'lobby:player-joined', 'lobby:player-left', 'lobby:settings-updated', 'lobby:error' (server to client)
    - [ ] **2.2a.7 [Test]** Write integration tests for lobby events

### 2.3 Frontend: Lobby UI & State
- [ ] **2.3a [Frontend]** Implement lobby components
    - [ ] **2.3a.1 [Frontend]** LobbyCreator.tsx (create lobby form)
    - [ ] **2.3a.2 [Frontend]** LobbyJoiner.tsx (join lobby form)
    - [ ] **2.3a.3 [Frontend]** LobbyRoom.tsx (lobby room UI, settings, player list)
    - [ ] **2.3a.4 [Frontend]** PlayerList.tsx (list of players, ready/host status)
- [ ] **2.3b [Frontend]** Implement lobby state management
    - [ ] **2.3b.1 [Frontend]** Lobby context/provider for state
    - [ ] **2.3b.2 [Frontend][Socket.IO]** Integrate with Socket.IO client for lobby events
    - [ ] **2.3b.3 [Frontend]** Handle lobby error and loading states

### 2.4 Firestore: Lobby State Persistence
- [ ] **2.4a [Firestore]** Persist lobby state in Firestore
    - [ ] **2.4a.1 [Firestore]** Sync lobby creation, updates, and player changes
    - [ ] **2.4a.2 [Firestore]** Listen for Firestore changes and update backend state
    - [ ] **2.4a.3 [Firestore]** Ensure real-time updates for all lobby participants

### 2.5 End-to-End Flow & Testing
- [ ] **2.5a [Test]** End-to-end test: create, join, leave, and start game in a lobby
    - [ ] **2.5a.1 [Test]** Manual test: multiple clients join/leave/start game
    - [ ] **2.5a.2 [Test]** Automated test: simulate lobby lifecycle

---

## Phase 3: Game Logic & Scoring
- [ ] Implement backend GameService (session management, round progression)
- [ ] Implement backend ScoringService (attempt-based scoring, leaderboards)
- [ ] Implement frontend game components (GameBoard, GuessInput, Timer, Scoreboard)
- [ ] Implement shared types and utilities (game, player, lobby, scoring)
- [ ] Integrate real-time game state sync via Socket.IO

## Phase 4: Audio Streaming
- [ ] Integrate YouTube API and ytdl-core for audio streaming (backend)
- [ ] Implement backend MusicService (track selection, metadata, stream URL)
- [ ] Implement frontend AudioPlayer component
- [ ] Handle audio loading, buffering, and error states

## Phase 5: Real-time Features & UI Polish
- [ ] Implement live scoreboard and round transitions
- [ ] Add player avatars and customization (optional)
- [ ] Implement client-side prediction and smooth UI updates
- [ ] Add error handling and user-friendly messages

## Phase 6: Deployment & Testing
- [ ] Write unit tests for core logic (game, scoring, services)
- [ ] Write integration tests for Socket.IO events
- [ ] Write end-to-end tests for game flow
- [ ] Load test for concurrent players
- [ ] Deploy backend to Firebase Functions
- [ ] Deploy frontend to Firebase Hosting

---

**Legend:**
- [ ] Not started
- [x] Completed
- **[User]**: Tasks for you to complete
- **[AI]**: Tasks the agent can do automatically 