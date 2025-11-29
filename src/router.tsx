import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostPage from "./pages/Post";
import ProtectPost from "./components/ProtectPost";
import NotFound from "./pages/NotFound";
import Comments from "./pages/Comments";
import About from "./pages/About";
import Submit from "./pages/Submit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts",
        children: [
          { index: true, element: <Posts /> }, // список постов
          {
            path: ":id",
            element: (
              <ProtectPost>
                <PostPage />
              </ProtectPost>
            ),
            children: [
              {
                path: "comments",
                element: <Comments />,
              },
            ],
          },
        ],
      },
      { path: "about", element: <About /> },
      { path: "submit", element: <Submit /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

