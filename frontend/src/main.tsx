/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/HomePage.tsx";
//const router = createBrowserRouter(...): Creates a router instance using the createBrowserRouter function from react-router-dom.
//The router is responsible for handling the routing logic in the application.
//createRoutesFromElements(...): Takes a JSX element and converts it into an array of route objects that can be consumed by the router.
//In this case, it wraps the <App /> component inside a
//createRoutesFromElements(...): Takes a JSX element and converts it into an array of route objects that can be consumed by the router. In this case,
// it wraps the <App /> component inside a
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
