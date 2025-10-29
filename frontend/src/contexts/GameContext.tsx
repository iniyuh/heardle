import type { ReactNode } from 'react'
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { gameReducer, initialGameState } from '../state/gameReducer'
import type { GameDispatch, GameState } from '../types/game'

interface GameContextValue {
  state: GameState
  dispatch: GameDispatch
}

const GameContext = createContext<GameContextValue | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGameContext = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }

  return context
}
