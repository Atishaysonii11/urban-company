import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/Layout";
import SelectService from "../pages/Select-Service";
import Checkout from "../pages/checkout";
import YourCart from "../pages/YourCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SelectService />,
      },
      {
        path: "/checkout",
        children: [{ path: "", element: <Checkout /> }],
      },
      {
        path: "your-cart",
        children: [{ path: "", element: <YourCart /> }],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export { router, AppRoutes };
