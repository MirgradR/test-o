import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

const Comments = () => {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        if (!res.ok) throw new Error("Failed to load comments");

        const data: Comment[] = await res.json();
        setComments(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchComments();
    }
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

