import { useState } from "react";
import { addRemovedPost } from "../../utils/storage/removedPostsAPI";

type RequestFn = (props: { postId: number }) => Promise<{ removedId: number }>;

export function useDeletePost() {
  const [isLoading, setIsLoading] = useState(false);

  const request: RequestFn = async ({ postId }) => {
    setIsLoading(true);

    return new Promise((resolve) => {
      const ontimeout = () => {
        setIsLoading(false);
        addRemovedPost(postId);
        resolve({ removedId: postId });
      };

      setTimeout(ontimeout, 1500);
    });
  };

  return {
    request,
    isLoading,
  };
}
