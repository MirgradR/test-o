import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetPostById } from '../http/hooks/useGetPostById';

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

  const getPostByIdAPI = useGetPostById();
  useEffect(() => {
    if (!id) return;

    getPostByIdAPI
      .request<Post>({ postId: id })
      .then(({ data }) => {
        if (data) setPost(data);
      })
  }, [id]);

  if (getPostByIdAPI.isLoading) return <p>Loading....</p>;
  if (!post) return <p>Post not found</p>;
  if (getPostByIdAPI.error) {
    return (
      <p style={{ color: "red", fontSize: "1.1rem" }}>
        ⚠️ Error: {getPostByIdAPI.error}
      </p>
    );
  }

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

