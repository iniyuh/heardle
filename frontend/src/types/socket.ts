export interface SocketState {
  isConnecting: boolean
  isConnected: boolean
  socketId: string | null
  activeRoomId: string | null
  connectionError: string | null
  lastHeartbeatAt: number | null
}

export type SocketAction =
  | { type: 'SOCKET_CONNECTING' }
  | { type: 'SOCKET_CONNECTED'; payload: { socketId: string } }
  | { type: 'SOCKET_DISCONNECTED' }
  | { type: 'SOCKET_ERROR'; payload: string }
  | { type: 'SOCKET_JOINED_ROOM'; payload: { roomId: string } }
  | { type: 'SOCKET_LEFT_ROOM' }
  | { type: 'SOCKET_HEARTBEAT'; payload: number }

export type SocketDispatch = (action: SocketAction) => void
