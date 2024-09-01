import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from 'firebase/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyBospm0ZD28CPjbwTDpPWB0fTfGDEbStoQ",
  authDomain: "tienda-brume.firebaseapp.com",
  projectId: "tienda-brume",
  storageBucket: "tienda-brume.appspot.com",
  messagingSenderId: "673002168218",
  appId: "1:673002168218:web:b6d9d51a9c5f98dc162423"
}

initializeApp (firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
