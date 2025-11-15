import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`${BASE_URL}/posts/${id}/comments`);
      const data = await res.json();
      setComments(data);
      setLoading(false);
    };
    fetchComments();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Comments</h3>

      {comments.map((c) => (
        <div
          key={c.id}
          style={{
            margin: "1rem 0",
            padding: "1rem",
            border: "1px solid #eee",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h4>{c.name}</h4>
          <p>{c.body}</p>
          <small style={{ color: "#666" }}>{c.email}</small>
        </div>
      ))}
    </div>
  );
};

export default Comments;
