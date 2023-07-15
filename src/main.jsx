import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'

import { Suspense, lazy } from 'react'
import { LoadingPrimary } from './components/loading/Loading'

// const App = lazy(()=> import("./App.jsx"))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Suspense fallback={<LoadingPrimary/>}> */}
      <App />
    {/* </Suspense> */}
  </React.StrictMode>,
)