import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to load post");
        }

        const data: Post = await res.json();
        setPost(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <p>Loading....</p>;
  if (!post) return <p>Post not found</p>;
  if (error)
    return (
      <p style={{ color: "red", fontSize: "1.1rem" }}>⚠️ Error: {error}</p>
    );

  return (
    <div className="container page-post">
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Back
      </button>

      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <Outlet />
    </div>
  );
};

export default PostPage;

