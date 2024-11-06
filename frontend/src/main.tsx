import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import store from './redux/store.ts'
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Store provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Store Persisting */}
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
