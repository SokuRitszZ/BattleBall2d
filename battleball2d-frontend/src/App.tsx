import {Routes, useRoutes} from "react-router-dom";
import routes from "./route";
import React from "react";
import AuthRoute from "./route/AuthRoute";

function App() {
  return (
    <React.Fragment>
      {useRoutes(routes)}
    </React.Fragment>
  );
}

export default App
