import React, { useCallback } from 'react';
import { useDeletePost } from '../../../http/hooks';
import PostCard, { PostCardProps } from './PostCard';

const PostCardAllWrapper = (props: PostCardProps) => {
  const deletePostAPI = useDeletePost();

  const deletePost = useCallback(() => {
    deletePostAPI
      .request({ postId: props.post.id })
      .then(({ removedId }) => {
        props.onDelete(removedId)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{ position: 'relative' }}
    >
      <PostCard
        {...props}
        onDelete={deletePost}
      />

      {deletePostAPI.isLoading && (
        <div className='post-removing'>
          <p>
            REMOVING POST...
          </p>
        </div>
      )}
    </div>
  )
}

export default React.memo(PostCardAllWrapper, (prev, next) => {
  const shouldCash =
    prev.highlight === next.highlight &&
    prev.post === next.post &&
    prev.userName === next.userName &&
    prev.userAddress === next.userAddress &&
    prev.onDelete === next.onDelete &&
    prev.onClick?.toString() === next.onClick?.toString();

  return shouldCash;
})
