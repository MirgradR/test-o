import { useCallback } from "react";
import { type Post } from "../../pages/Post";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  postId: string | number;
}

export function useGetPostById(props?: HookProps) {
  const { request: coreRequest, ...api } = useRequest(props ?? {});

  const request = useCallback(
    async (props: RequestProps) => {
      const response = await coreRequest<Post>({
        method: "GET",
        url: apiPaths.post.get(props.postId),
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}
