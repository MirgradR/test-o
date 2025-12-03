import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCommentsForPost } from '../http/hooks/useGetCommentsForPost';

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

  const getCommentsForPostAPI = useGetCommentsForPost();
  useEffect(() => {
    if (!id) return;

    getCommentsForPostAPI
      .request<Comment[]>({ postId: id })
      .then(({ data }) => {
        if (data) setComments(data);
      })
  }, [id]);

  if (getCommentsForPostAPI.isLoading) return <p>Loading....</p>;

  if (getCommentsForPostAPI.error) {
    return (
      <p className="comments-error">
        ⚠️ Error: {getCommentsForPostAPI.error}
      </p>
    );
  }

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

