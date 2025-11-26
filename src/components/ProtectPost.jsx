import { Navigate, useParams } from "react-router-dom";

const ProtectPost = ({ children }) => {
  const { id } = useParams();
  const postId = Number(id);

  if (postId > 5) {
    return <Navigate to="/posts" replace />;
  }

  return children;
};

export default ProtectPost;
