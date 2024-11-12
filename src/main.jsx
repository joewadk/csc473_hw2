import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' //old app component from project init. dont need it
import SearchComponent from './components/search.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchComponent />
  </React.StrictMode>,
)
