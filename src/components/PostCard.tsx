import {Post} from "../pages/Post";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 50)}...</p>
      <button onClick={onClick}>Read more</button>
    </article>
  );
};

export default PostCard;

