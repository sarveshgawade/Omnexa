import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <BrowserRouter>
        <Toaster position="bottom-right" expand={true} />
        <App />
    </BrowserRouter>
    </Provider>
)
