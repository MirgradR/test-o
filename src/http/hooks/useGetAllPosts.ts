import { useCallback } from "react";
import { type Post } from "../../pages/Post";
import { getRemovedPostsIds } from "../../utils/storage/removedPostsAPI";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  search?: string;
}

export function useGetAllPosts(props?: HookProps) {
  const { request: coreRequest, ...api } = useRequest(props ?? {});

  const request = useCallback(
    async (props: RequestProps) => {
      const response = await coreRequest<Post[]>({
        method: "GET",
        url: apiPaths.posts.get(),
        params: { q: props.search },
      });

      if (!response.data?.length || response.error) {
        return response;
      }

      const removedPostsIds = getRemovedPostsIds();
      const existPosts = response.data.filter((p) => !removedPostsIds.includes(p.id));
      return { data: existPosts, error: "" };
    },
    [coreRequest]
  );

  return { ...api, request };
}
