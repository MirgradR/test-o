import React, { useMemo } from 'react';
import { User } from '../http/hooks';
import { Post } from "../pages/Post";
import clsx from 'clsx';

interface PostCardProps {
  post: Post;
  user?: User;
  onClick: () => void;
  highlight?: boolean;
}

const PostCard = ({ post, user, onClick, highlight = false }: PostCardProps) => {

  const fullAddress = useMemo(() => {
    if (!user) return "Russia";

    const { name, address } = user;

    if (name.length <= 5) {
      return `${address.city} ${address.street}`;
    }

    if (name.length <= 10) {
      return `${address.geo.lat} ${address.geo.lng}`;
    }

    return `${address.suite} ${address.zipcode}`;
  }, [user]);

  return (
    <article
      className={clsx(
        "post-card",
        highlight && 'post-card--highlight'
      )}
    >
      <p className='post-card-user'>
        <span>{user?.username || 'Anonymous'}</span>
        <span>( {fullAddress} )</span>
      </p>

      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 50)}...</p>
      <button onClick={onClick}>Read more</button>
    </article>
  );
};

export default React.memo(PostCard, (prevProps, nextProps) => {
  const isSameProps =
    prevProps.post === nextProps.post &&
    prevProps.user === nextProps.user &&
    prevProps.highlight === nextProps.highlight &&
    prevProps.onClick.toString() === nextProps.onClick.toString()

  return isSameProps;
});

