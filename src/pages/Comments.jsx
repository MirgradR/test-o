import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        if (!res.ok) throw new Error("Failed to load comments");

        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  if (loading) return <p>Loading....</p>;

  if (error) return <p className="comments-error">⚠️ Error: {error}</p>;

  return (
    <div className="comments-wrapper">
      <h3>Comments</h3>
      {comments.map((c) => (
        <div key={c.id} className="comment-card">
          <h4>{c.name}</h4>
          <p>{c.body}</p>
          <small>{c.email}</small>
        </div>
      ))}
    </div>
  );
};

export default Comments;
