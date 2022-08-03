import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { EuiProvider } from '@elastic/eui'
import '@elastic/eui/dist/eui_theme_light.css'
import { NavBar } from './Components/NavBar/NavBar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <EuiProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EuiProvider>
    </Provider>
  </React.StrictMode>
)
