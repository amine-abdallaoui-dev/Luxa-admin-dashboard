import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './store/store.js'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
      <Provider store={Store}>
       <Toaster
            position="top-right"
            reverseOrder={false}
             toastOptions={{
                style: {
                padding: '10px',
                color: '#fff',
                backgroundColor : "#161a1d"
                },
  }}
            />
          <App />
      </Provider>

)
