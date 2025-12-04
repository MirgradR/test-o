import { createBrowserRouter } from "react-router-dom";
import { JSX, lazy, Suspense } from 'react';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProtectPost from "./components/ProtectPost";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
const PostsLazy = lazy(() => import("./pages/Posts"));
const PostPageLazy = lazy(() => import("./pages/Post"));
const CommentsLazy = lazy(() => import("./pages/Comments"));
const SubmitLazy = lazy(() => import("./pages/Submit"));

const lazyElement = (component: JSX.Element) => (
  <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts",
        children: [
          { index: true, element: lazyElement(<PostsLazy />) },
          {
            path: ":id",
            element: (
              <ProtectPost>
                {lazyElement(<PostPageLazy />)}
              </ProtectPost>
            ),
            children: [
              {
                path: "comments",
                element: lazyElement(<CommentsLazy />),
              },
            ],
          },
        ],
      },
      { path: "about", element: <About /> },
      { path: "submit", element: lazyElement(<SubmitLazy />) },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

