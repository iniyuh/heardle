import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSocketContext } from './contexts/SocketContext'
import { env } from './config/env'

function App() {
  const [count, setCount] = useState(0)
  const { state: socketState } = useSocketContext()
  const { apiUrl } = env

  useEffect(() => {
    if (env.enableDevLogging) {
      console.info('[env] Loaded API URL:', apiUrl)
      console.info('[env] Initial socket state:', socketState)
    }
  }, [apiUrl, socketState])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React Luna</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          API base URL: <code>{apiUrl || 'Not configured'}</code>
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      {/* <div className="flex items-center justify-center bg-green-600 text-white text-2xl font-bold">
        Tailwind is working 🎉
      </div> */}
    </>
  )
}

export default App
