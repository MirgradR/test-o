import React, { useCallback } from 'react';
import PostCard, { PostCardProps } from './PostCard';
import { removeUserPost } from '../../../utils/storage/createdPostsAPI';

const PostCardUserWrapper = (props: PostCardProps) => {
  const { onDelete } = props;
  const postId = props.post.id;

  const deletePost = useCallback(() => {
    removeUserPost({ userPostId: postId });
    onDelete(postId)
  }, [onDelete, postId])

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
