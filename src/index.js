import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./services/store";
import Home from "./routes/index.jsx";
import Viewer from "./routes/Viewer.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/viewer",
    element: <Viewer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Login>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Login>
);
