import React, { useCallback } from 'react';
import PostCard, { PostCardProps } from './PostCard';
import { removeUserPost } from '../../../utils/storage/createdPostsAPI';

const PostCardUserWrapper = (props: PostCardProps) => {

  const deletePost = useCallback(() => {
    removeUserPost({ userPostId: props.post.id });
    props.onDelete(props.post.id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PostCard
      {...props}
      onDelete={deletePost}
    />
  )
}

export default React.memo(PostCardUserWrapper, (prev, next) => {
  const shouldCash =
    prev.highlight === next.highlight &&
    prev.post === next.post &&
    prev.userName === next.userName &&
    prev.userAddress === next.userAddress &&
    prev.onDelete === next.onDelete &&
    prev.onClick?.toString() === next.onClick?.toString();

  return shouldCash;
})
