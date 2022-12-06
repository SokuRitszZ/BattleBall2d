import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import '@/index.css'
import {Provider} from "react-redux";
import store from "./redux/store";
import AppRouter from "./views/AppRouter";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <div className="h-screen flex justify-center flex-col">
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </div>
  </BrowserRouter>
);
