import { Post } from "../../../pages/Post";
import clsx from 'clsx';

export interface PostCardProps {
  post: Post;
  userName?: string;
  userAddress?: string;
  onClick?: () => void;
  highlight?: boolean;
  onDelete: (postId: number) => void;
}

const PostCard = ({ post, userName, userAddress, onClick, onDelete, highlight = false }: PostCardProps) => {
  return (
    <article
      className={clsx(
        "post-card",
        highlight && 'post-card--highlight'
      )}
    >
      <>
        {Boolean(userName && userAddress) && (
          <p className='post-card-user'>
            <span>{userName}</span>
            <span>{userAddress}</span>
          </p>
        )}

        <h3>{post.title}</h3>
        <p>{post.body.slice(0, 50)}...</p>

        {onClick && (
          <button onClick={onClick}>
            Read more
          </button>
        )}
      </>

      <button
        onClick={() => onDelete(post.id)}
        className='post-card-delete'
      >
        x
      </button>
    </article>
  );
};

export default PostCard;

