import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import './index.css'
import {Provider} from "react-redux";
import store from "./redux/store";
import routes from "./route";
import App from "./App";

const element = routes;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <div className="h-screen flex justify-center flex-col">
      <Provider store={store}>
        <App/>
      </Provider>
    </div>
  </BrowserRouter>
);
