// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from './pages/Home';
import Beverages from './pages/Beverages';
import BeveragesFuture from './pages/BeveragesFuture';
import Whiskey from './pages/Whiskey';
import Liquor from './pages/Liquor';
import Wine from './pages/Wine';
import ErrorBoundary from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home />, errorElement: <ErrorBoundary />},
      { path: "beverages", element: <Beverages />, errorElement: <ErrorBoundary />},
      { path: "beveragesFuture", element: <BeveragesFuture />, errorElement: <ErrorBoundary />},
      { path: "liquor", element: <Liquor />, errorElement: <ErrorBoundary />},
      { path: "whisky", element: <Whiskey />, errorElement: <ErrorBoundary />},
      { path: "whiskey", element: <Whiskey />, errorElement: <ErrorBoundary />},
      { path: "wine", element: <Wine />, errorElement: <ErrorBoundary />},
      { path: "*", element: <ErrorBoundary />, errorElement: <ErrorBoundary />},
    ],
  },
]);
