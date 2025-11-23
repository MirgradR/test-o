import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const PostCard = ({ post }) => {
  const { theme } = useTheme();

  return (
    <article className={`post-card ${theme}`}>
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
      <Link to={`/posts/${post.id}/comments`}>Read more</Link>
    </article>
  );
};

export default PostCard;
