import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Result } from "antd";
import { openRoutes, protectedRoutes } from "./routes";

const isAuth = false;

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<Navigate replace to={isAuth ? "/main" : "/login"} />}
      />
      {openRoutes.map((route) => (
        <Route
          path={route.path}
          element={isAuth ? <Navigate replace to="/main" /> : route.element}
          key={route.path}
        />
      ))}
      {protectedRoutes.map((route) => (
        <Route
          path={route.path}
          element={isAuth ? route.element : <Navigate replace to="/login" />}
          key={route.path}
        />
      ))}
      <Route
        path="*"
        element={
          <Result status="404" title="404" subTitle="Такого у нас нет" />
        }
      />
    </Routes>
  </Router>
);

export default App;
