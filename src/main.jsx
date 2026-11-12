import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ClockApp from './ClockApp'
import './base.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main>
      <ClockApp />
    </main>
  </StrictMode>,
)
