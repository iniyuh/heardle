import type { GameAction, GameState, PlayerSummary, RoundProgress } from '../types/game'

const defaultSettings = {
  totalRounds: 5,
  roundLengthSeconds: 30,
  maxPlayers: 8,
  playlistId: undefined,
}

const defaultRound: RoundProgress = {
  currentRound: 0,
  totalRounds: 0,
  roundEndsAt: undefined,
}

const createInitialGameState = (): GameState => ({
  status: 'idle',
  hostId: null,
  players: [],
  settings: { ...defaultSettings },
  round: { ...defaultRound },
  recentGuess: null,
  activeTrackId: null,
})

export const initialGameState = createInitialGameState()

const upsertPlayer = (players: PlayerSummary[], player: PlayerSummary) => {
  const existingIndex = players.findIndex((p) => p.id === player.id)
  if (existingIndex === -1) {
    return [...players, player]
  }

  const updated = [...players]
  updated[existingIndex] = { ...updated[existingIndex], ...player }
  return updated
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload }
    case 'SET_HOST':
      return { ...state, hostId: action.payload }
    case 'SET_PLAYERS':
      return { ...state, players: action.payload }
    case 'UPSERT_PLAYER':
      return { ...state, players: upsertPlayer(state.players, action.payload) }
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      }
    case 'SET_ROUND_PROGRESS':
      return {
        ...state,
        round: {
          ...state.round,
          ...action.payload,
        },
      }
    case 'SET_RECENT_GUESS':
      return { ...state, recentGuess: action.payload }
    case 'SET_ACTIVE_TRACK':
      return { ...state, activeTrackId: action.payload }
    case 'RESET_GAME':
      return createInitialGameState()
    case 'HYDRATE_STATE':
      return { ...action.payload }
    default:
      return state
  }
}
