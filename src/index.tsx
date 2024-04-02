import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Enquiry from "./pages/enquiry";
import Payment from "./pages/payment";
import Navbar from "./components/Navbar";
import Ticket from "./pages/Ticket";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  // create a nested route with navbar and home
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/enquiry",
        element: <Enquiry />,
      },
      {
        path: "/payment/:id",
        element: <Payment />,
      },
      {
        path: "/gen-ticket",
        element: <Ticket />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
