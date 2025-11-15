import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const PostModalContent = ({ id }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${BASE_URL}/posts/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load post");
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <Loader />;
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
};

export default PostModalContent;
