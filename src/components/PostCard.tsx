import React from 'react';
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

  let fullAddress = 'Russia';
  if (user) {
    const chars = user.name.length;

    if (chars <= 5) {
      fullAddress = user.address.city + user.address.street;
    } else if (chars > 5 && chars <= 10) {
      fullAddress = user.address.geo.lat + user.address.geo.lng;
    } else {
      fullAddress = user.address.suite + user.address.zipcode;
    }
  }

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

