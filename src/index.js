import { App } from './App'
import './styles.css'

export const app = new App()
document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    app.loadNotesFromLocalStorage()
  }
})
