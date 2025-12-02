import { Post } from "../pages/Post";
import clsx from 'clsx';

interface PostCardProps {
  post: Post;
  onClick: () => void;
  highlight?: boolean;
}

const PostCard = ({ post, onClick, highlight = false }: PostCardProps) => {

  return (
    <article
      className={clsx(
        "post-card",
        highlight && 'post-card--highlight'
      )}
    >
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 50)}...</p>
      <button onClick={onClick}>Read more</button>
    </article>
  );
};

export default PostCard;

