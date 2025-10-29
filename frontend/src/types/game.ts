export type GameStatus =
  | 'idle'
  | 'lobby'
  | 'countdown'
  | 'in-round'
  | 'round-results'
  | 'completed'

export interface PlayerSummary {
  id: string
  displayName: string
  isHost?: boolean
  isReady?: boolean
  score?: number
}

export interface LobbySettings {
  totalRounds: number
  roundLengthSeconds: number
  maxPlayers: number
  playlistId?: string
}

export interface RoundProgress {
  currentRound: number
  totalRounds: number
  roundEndsAt?: number
}

export interface PlayerGuess {
  playerId: string
  guess: string
  submittedAt: number
  isCorrect: boolean
  attemptNumber: number
}

export interface GameState {
  status: GameStatus
  hostId: string | null
  players: PlayerSummary[]
  settings: LobbySettings
  round: RoundProgress
  recentGuess: PlayerGuess | null
  activeTrackId: string | null
}

export type GameAction =
  | { type: 'SET_STATUS'; payload: GameStatus }
  | { type: 'SET_HOST'; payload: string | null }
  | { type: 'SET_PLAYERS'; payload: PlayerSummary[] }
  | { type: 'UPSERT_PLAYER'; payload: PlayerSummary }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<LobbySettings> }
  | { type: 'SET_ROUND_PROGRESS'; payload: RoundProgress }
  | { type: 'SET_RECENT_GUESS'; payload: PlayerGuess | null }
  | { type: 'SET_ACTIVE_TRACK'; payload: string | null }
  | { type: 'RESET_GAME' }
  | { type: 'HYDRATE_STATE'; payload: GameState }

export type GameDispatch = (action: GameAction) => void
