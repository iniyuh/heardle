import type { SocketAction, SocketState } from '../types/socket'

const createInitialSocketState = (): SocketState => ({
  isConnecting: false,
  isConnected: false,
  socketId: null,
  activeRoomId: null,
  connectionError: null,
  lastHeartbeatAt: null,
})

export const initialSocketState = createInitialSocketState()

export const socketReducer = (state: SocketState, action: SocketAction): SocketState => {
  switch (action.type) {
    case 'SOCKET_CONNECTING':
      return {
        ...state,
        isConnecting: true,
        connectionError: null,
      }
    case 'SOCKET_CONNECTED':
      return {
        ...state,
        isConnecting: false,
        isConnected: true,
        socketId: action.payload.socketId,
        connectionError: null,
      }
    case 'SOCKET_DISCONNECTED':
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
        socketId: null,
        activeRoomId: null,
      }
    case 'SOCKET_ERROR':
      return {
        ...state,
        isConnecting: false,
        connectionError: action.payload,
      }
    case 'SOCKET_JOINED_ROOM':
      return {
        ...state,
        activeRoomId: action.payload.roomId,
      }
    case 'SOCKET_LEFT_ROOM':
      return {
        ...state,
        activeRoomId: null,
      }
    case 'SOCKET_HEARTBEAT':
      return {
        ...state,
        lastHeartbeatAt: action.payload,
      }
    default:
      return state
  }
}
