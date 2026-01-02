import { createRoot } from 'react-dom/client'
import { MainApp } from './main-app'

const element = document.getElementById('app')
if (!element) {
  throw new Error('No app element found')
}

createRoot(element).render(<MainApp />)
