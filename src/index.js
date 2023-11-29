import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './pages/Users';
import UserById from './pages/UserById';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users/> 
  },
  {
    path: "user/:id",
    element: <UserById/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);