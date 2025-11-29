import { Navigate, useParams } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectPostProps {
  children: ReactNode;
}

const ProtectPost = ({ children }: ProtectPostProps) => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  if (postId > 5) {
    return <Navigate to="/posts" replace />;
  }

  return <>{children}</>;
};

export default ProtectPost;

