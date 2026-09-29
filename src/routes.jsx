import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Shelf from "./pages/Shelf";
import BottleDetail from "./pages/BottleDetail";
import WineDetail from "./pages/WineDetail";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "recipes", element: <Recipes /> },
      { path: "recipes/:slug", element: <RecipeDetail /> },
      { path: "shelf", element: <Shelf /> },
      { path: "bottles/:slug", element: <BottleDetail /> },
      { path: "wines/:slug", element: <WineDetail /> },
      { path: "shop", element: <Shop /> },
      { path: "beverages", element: <Navigate to="/recipes" replace /> },
      { path: "beveragesFuture", element: <Navigate to="/recipes?status=draft" replace /> },
      { path: "liquor", element: <Navigate to="/shelf" replace /> },
      { path: "whisky", element: <Navigate to="/shelf?family=whiskey" replace /> },
      { path: "whiskey", element: <Navigate to="/shelf?family=whiskey" replace /> },
      { path: "wine", element: <Navigate to="/shelf?kind=wine" replace /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
