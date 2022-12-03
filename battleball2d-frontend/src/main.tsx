import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import '@/index.css'
import AccountView from "./views/Account/AccountView";
import GameView from "./views/Game/GameView";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <div className="h-screen flex justify-center flex-col">
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/account" element={<AccountView/>}/>
        <Route path="/game" element={<GameView/>}/>
      </Routes>
    </div>
  </BrowserRouter>
)
