/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./store.tsx";
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
import ProductPage from "./pages/ProductPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

//react-helmet is a library that allows you to manage the document head (e.g., the <head> element) of your application. It provides a way to dynamically set the title, meta tags, and other head elements based on the current state of your React components.

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
