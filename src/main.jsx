import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AddCoffeePage from "./pages/AddCoffeePage.jsx";
import UpdateCoffeePage from "./pages/UpdateCoffeePage.jsx";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AuthProvider from "./providers/AuthProvider";
import Users from "./components/Users";
import ErrorPage from "./pages/ErrorPage";
import ViewCoffeePage from "./pages/ViewCoffeePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: () => fetch("http://localhost:5000/coffee"),
  },
  {
    path: "/addCoffee",
    element: <AddCoffeePage></AddCoffeePage>,
  },
  {
    path: "/viewCoffee/:id",
    element: <ViewCoffeePage></ViewCoffeePage>,
    loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`),
  },
  {
    path: "/updateCoffee/:id",
    element: <UpdateCoffeePage></UpdateCoffeePage>,
    loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`),
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch("http://localhost:5000/user"),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
