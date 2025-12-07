import { useCallback, useState } from "react";
import { addRemovedPost } from "../../utils/storage/removedPostsAPI";

type RequestFn = (props: { postId: number }) => Promise<{ removedId: number }>;

export function useDeletePost() {
  const [isLoading, setIsLoading] = useState(false);

  const request: RequestFn = useCallback(async ({ postId }) => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        addRemovedPost(postId);
        resolve({ removedId: postId });
      }, 1500);
    });
  }, []);

  return {
    request,
    isLoading,
  };
}
