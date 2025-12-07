import { useCallback } from "react";
import { type Comment } from "../../pages/Comments";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  postId: string | number;
}

export function useGetCommentsForPost(props?: HookProps) {
  const { request: coreRequest, ...api } = useRequest(props ?? {});

  const request = useCallback(
    async (props: RequestProps) => {
      const response = await coreRequest<Comment[]>({
        method: "GET",
        url: apiPaths.postComments.get(props.postId),
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}
