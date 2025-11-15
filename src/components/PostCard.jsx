import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <article className="post-card">
    <h3>{post.title}</h3>
    <p>{post.body.slice(0, 100)}...</p>
    <Link to={`/posts/${post.id}/comments`}>Read more</Link>
  </article>
);

export default PostCard;
