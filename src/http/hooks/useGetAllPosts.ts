import { type Post } from "../../pages/Post";
import { getRemovedPostsIds } from "../../utils/storage/removedPostsAPI";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  search?: string;
}

export function useGetAllPosts(props?: HookProps) {
  const requestAPI = useRequest(props ?? {});

  const request = async (props: RequestProps) => {
    const response = await requestAPI.request<Post[]>({
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
  };

  return {
    ...requestAPI,
    request,
  };
}
