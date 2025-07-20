# Multiplayer Heardle - System Design & Implementation PRD

## Project Overview
**Project Name**: Multiplayer Heardle  
**Purpose**: A real-time multiplayer music guessing game where players compete to identify songs with the fewest attempts, similar to Heardle but with Skribbl.io-style lobbies.

## Core Features

### MVP Features
- **Lobby System**: Create/join rooms with custom names and game settings
- **Real-time Gameplay**: Synchronized rounds with audio streaming from YouTube
- **Scoring System**: Attempt-based scoring (fewer attempts = higher score)
- **Round Management**: Configurable round duration and total rounds
- **Live Scoreboard**: Real-time score updates and final rankings

### Nice-to-Have Features
- Player avatars and customization
- Song difficulty levels
- Game statistics and history
- Spectator mode
- Custom playlists

## Tech Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Real-time**: Socket.IO Client
- **Audio**: HTML5 Audio API
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18 + TypeScript
- **Framework**: Express.js
- **Real-time**: Socket.IO Server
- **Database**: Firestore (Firebase)
- **Audio Processing**: ytdl-core for YouTube integration
- **Deployment**: Firebase Functions + Hosting

### External Services
- **Audio Source**: YouTube API v3
- **Database**: Firestore (real-time NoSQL)
- **Hosting**: Firebase Hosting
- **Functions**: Firebase Functions (serverless)

## Project Structure

```
multiplayer-heardle/
├── frontend/                        # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── lobby/
│   │   │   │   ├── LobbyCreator.tsx
│   │   │   │   ├── LobbyJoiner.tsx
│   │   │   │   ├── LobbyRoom.tsx
│   │   │   │   └── PlayerList.tsx
│   │   │   ├── game/
│   │   │   │   ├── GameBoard.tsx
│   │   │   │   ├── AudioPlayer.tsx
│   │   │   │   ├── GuessInput.tsx
│   │   │   │   ├── Timer.tsx
│   │   │   │   └── Scoreboard.tsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Toast.tsx
│   │   │   └── layout/
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── Layout.tsx
│   │   ├── hooks/
│   │   │   ├── useSocket.ts
│   │   │   ├── useGame.ts
│   │   │   ├── useAudio.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── contexts/
│   │   │   ├── GameContext.tsx
│   │   │   ├── SocketContext.tsx
│   │   │   └── PlayerContext.tsx
│   │   ├── services/
│   │   │   ├── socketService.ts
│   │   │   ├── audioService.ts
│   │   │   └── gameService.ts
│   │   ├── types/
│   │   │   ├── game.ts
│   │   │   ├── player.ts
│   │   │   ├── lobby.ts
│   │   │   └── socket.ts
│   │   ├── utils/
│   │   │   ├── scoring.ts
│   │   │   ├── validation.ts
│   │   │   └── constants.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                         # Firebase Functions
│   ├── src/
│   │   ├── services/
│   │   │   ├── LobbyService.ts
│   │   │   ├── GameService.ts
│   │   │   ├── PlayerService.ts
│   │   │   ├── MusicService.ts
│   │   │   └── ScoringService.ts
│   │   ├── models/
│   │   │   ├── Lobby.ts
│   │   │   ├── Player.ts
│   │   │   ├── GameSession.ts
│   │   │   ├── Track.ts
│   │   │   └── Guess.ts
│   │   ├── socket/
│   │   │   ├── socketServer.ts
│   │   │   ├── eventHandlers.ts
│   │   │   └── socketMiddleware.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── validation.ts
│   │   │   └── constants.ts
│   │   ├── types/
│   │   │   ├── socket.ts
│   │   │   ├── game.ts
│   │   │   └── api.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                          # Shared types and utilities
│   ├── types/
│   │   ├── game.ts
│   │   ├── player.ts
│   │   ├── lobby.ts
│   │   └── socket.ts
│   └── utils/
│       ├── gameRules.ts
│       └── scoring.ts
│
├── firebase.json
├── firestore.rules
├── .env.example
├── package.json
└── README.md
```

## Key Modules and Classes

### Frontend Modules

#### `LobbyService`
- Create/join lobbies
- Manage lobby settings
- Handle player connections

#### `GameService`
- Manage game state
- Handle round progression
- Process guesses and scoring

#### `AudioService`
- Stream audio from YouTube
- Control playback (play/pause/seek)
- Handle audio loading states

#### `SocketService`
- WebSocket connection management
- Event emission and listening
- Connection state handling

### Backend Modules

#### `LobbyService`
- CRUD operations for lobbies
- Player management within lobbies
- Lobby lifecycle management

#### `GameService`
- Game session management
- Round timing and progression
- State synchronization

#### `MusicService`
- YouTube API integration
- Audio stream extraction
- Track metadata management

#### `ScoringService`
- Calculate attempt-based scores
- Manage leaderboards
- Track player statistics

## Data Models & Interfaces

### Core Entities

```typescript
// Lobby Entity
interface Lobby {
  id: string;
  name: string;
  hostId: string;
  players: Player[];
  settings: LobbySettings;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: Date;
  updatedAt: Date;
}

interface LobbySettings {
  maxPlayers: number;
  roundDuration: number; // in seconds
  totalRounds: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Player Entity
interface Player {
  id: string;
  name: string;
  lobbyId: string;
  score: number;
  isReady: boolean;
  isHost: boolean;
  avatar?: string;
  joinedAt: Date;
  lastSeen: Date;
}

// Game Session Entity
interface GameSession {
  id: string;
  lobbyId: string;
  currentRound: number;
  totalRounds: number;
  status: 'waiting' | 'playing' | 'finished';
  currentTrack?: Track;
  roundStartTime?: Date;
  roundEndTime?: Date;
  guesses: Guess[];
  createdAt: Date;
  updatedAt: Date;
}

// Track Entity
interface Track {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: number;
  streamUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  genre?: string;
}

// Guess Entity
interface Guess {
  id: string;
  playerId: string;
  gameSessionId: string;
  round: number;
  guess: string;
  isCorrect: boolean;
  attemptNumber: number;
  points: number;
  submittedAt: Date;
}
```

## Socket.IO Events

### Client to Server Events

```typescript
// Lobby Events
'lobby:create' -> { name: string, settings: LobbySettings }
'lobby:join' -> { lobbyId: string, playerName: string }
'lobby:leave' -> { lobbyId: string, playerId: string }
'lobby:start-game' -> { lobbyId: string }
'lobby:update-settings' -> { lobbyId: string, settings: LobbySettings }

// Game Events
'game:player-ready' -> { lobbyId: string, playerId: string }
'game:submit-guess' -> { lobbyId: string, playerId: string, guess: string, attemptNumber: number }
'game:next-round' -> { lobbyId: string }
'game:end-game' -> { lobbyId: string }

// Player Events
'player:update-name' -> { playerId: string, name: string }
'player:heartbeat' -> { playerId: string }
```

### Server to Client Events

```typescript
// Lobby Events
'lobby:created' -> { lobby: Lobby }
'lobby:joined' -> { lobby: Lobby, player: Player }
'lobby:player-joined' -> { player: Player }
'lobby:player-left' -> { playerId: string }
'lobby:settings-updated' -> { settings: LobbySettings }
'lobby:error' -> { message: string }

// Game Events
'game:started' -> { gameSession: GameSession }
'game:round-started' -> { round: number, track: Track, startTime: Date }
'game:round-ended' -> { round: number, correctAnswer: string, scores: PlayerScore[] }
'game:guess-submitted' -> { guess: Guess }
'game:player-ready' -> { playerId: string }
'game:finished' -> { finalScores: PlayerScore[], winner: Player }

// System Events
'connection:established' -> { playerId: string }
'connection:error' -> { message: string }
'sync:game-state' -> { gameSession: GameSession }
```

## Socket.IO Event Flow

### Lobby Creation Flow
1. Client: `lobby:create` → Server
2. Server: Create lobby in Firestore
3. Server: `lobby:created` → Client
4. Client: Navigate to lobby room

### Game Start Flow
1. Host: `lobby:start-game` → Server
2. Server: Create GameSession
3. Server: `game:started` → All players
4. Server: Load first track
5. Server: `game:round-started` → All players
6. Clients: Start round timer and audio

### Guess Submission Flow
1. Player: `game:submit-guess` → Server
2. Server: Validate guess
3. Server: Calculate score
4. Server: Update Firestore
5. Server: `game:guess-submitted` → All players
6. Server: Check if round should end

### Round End Flow
1. Server: Round timer expires OR all players guessed
2. Server: Calculate final scores
3. Server: `game:round-ended` → All players
4. Server: Prepare next round OR end game

## Scalability Notes

### Memory vs Redis
- **Current**: In-memory game state for simplicity
- **Scale Option**: Redis for shared state across multiple server instances
- **Firestore**: Used for persistence and cross-session data

### Connection Management
- **Current**: Single Node.js process with Socket.IO
- **Scale Option**: Socket.IO adapter for Redis to support multiple servers
- **Considerations**: Sticky sessions for WebSocket connections

### Audio Processing
- **Current**: YouTube API + ytdl-core in Firebase Functions
- **Scale Option**: Cache audio URLs, implement rate limiting
- **Considerations**: YouTube API quotas and terms of service

### Database Optimization
- **Firestore**: Optimized for real-time updates but watch read/write limits
- **Indexing**: Create composite indexes for complex queries
- **Caching**: Client-side caching for static data (tracks, player info)

## Important Implementation Notes

### Audio Streaming
- YouTube URLs expire after ~6 hours, implement refresh logic
- Handle audio loading states and buffering
- Implement fallback for failed audio streams

### Real-time Synchronization
- Use server timestamps for round synchronization
- Implement client-side prediction for smooth UI
- Handle network disconnections gracefully

### Security Considerations
- Validate all client inputs server-side
- Implement rate limiting for guess submissions
- Use Firestore security rules for data access

### Performance Optimizations
- Lazy load audio streams (only when round starts)
- Implement connection pooling for YouTube API
- Use WebSocket heartbeat for connection monitoring

### Error Handling
- Implement reconnection logic for Socket.IO
- Handle YouTube API failures gracefully
- Provide user-friendly error messages

### Testing Strategy
- Unit tests for game logic and scoring
- Integration tests for Socket.IO events
- End-to-end tests for game flow
- Load testing for concurrent players

## Development Workflow

1. **Setup**: Initialize Firebase project, install dependencies
2. **Phase 1**: Build lobby system with Socket.IO
3. **Phase 2**: Implement game logic and scoring
4. **Phase 3**: Integrate YouTube API and audio streaming
5. **Phase 4**: Add real-time features and polish UI
6. **Phase 5**: Deploy to Firebase and test with multiple users

## Environment Variables

```env
# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# YouTube API
YOUTUBE_API_KEY=your-youtube-api-key

# Socket.IO
SOCKET_IO_CORS_ORIGIN=http://localhost:3000
```

This PRD provides a comprehensive foundation for implementing the Multiplayer Heardle game. Each section is designed to give Cursor's AI assistant clear context for building individual components while maintaining the overall system architecture.