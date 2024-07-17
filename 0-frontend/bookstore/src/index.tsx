import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import BookDetailsPage from "./pages/BookDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import AdminPage from "./pages/AdminPage";
import AdminAuthorCreatePage from "./pages/AdminAuthorCreatePage";
import AdminAuthorEditPage from "./pages/AdminAuthorEditPage";
import AuthorsPage from "./pages/AuthorsPage";
import BooksPage from "./pages/BooksPage";
import Homepage from "./pages/Homepage";
import AdminBookCreatePage from "./pages/AdminBookCreatePage";
import AdminBookEditPage from "./pages/AdminBookEditPage";
import NotFoundPage from "./pages/NotFoundPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**
 * Here be routing
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "books",
    children: [
      {
        index: true,
        element: <BooksPage />,
      },
      {
        path: ":isbn",
        element: <BookDetailsPage />,
      },
    ],
  },
  {
    path: "authors",
    children: [
      {
        index: true,
        element: <AuthorsPage />,
      },
      {
        path: ":id",
        element: <AuthorDetailsPage />,
      },
    ],
  },
  {
    path: "admin",
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "authors/",
        element: <AdminAuthorCreatePage />,
      },
      {
        path: "authors/:id",
        element: <AdminAuthorEditPage />,
      },
      {
        path: "books/",
        element: <AdminBookCreatePage />,
      },
      {
        path: "books/:isbn",
        element: <AdminBookEditPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <NextUIProvider>     
        <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
