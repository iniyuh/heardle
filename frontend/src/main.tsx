import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.css'
import App from './App.tsx'
import { GameProvider } from './contexts/GameContext'
import { SocketProvider } from './contexts/SocketContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </SocketProvider>
  </StrictMode>,
)
