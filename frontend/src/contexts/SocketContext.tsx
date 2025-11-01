import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useReducer } from 'react'
import { socketReducer, initialSocketState } from '../state/socketReducer'
import type { SocketDispatch, SocketState } from '../types/socket'

interface SocketContextValue {
  state: SocketState
  dispatch: SocketDispatch
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(socketReducer, initialSocketState)

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export const useSocketContext = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider')
  }

  return context
}
