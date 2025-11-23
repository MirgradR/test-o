import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import Comments from "./pages/Comments";
import ProtectPost from "./components/ProtectPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts",
        children: [
          { index: true, element: <Posts /> },

          {
            path: ":id",
            element: (
              <ProtectPost>
                <Post />
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
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
