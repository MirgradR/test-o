import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  search?: string;
}

export function useGetAllPosts(props?: HookProps) {
  const requestAPI = useRequest(props ?? {});

  const request = async <D>(props: RequestProps) => {
    const response = await requestAPI.request<D>({
      method: "GET",
      url: apiPaths.posts.get(),
      params: { q: props.search },
    });

    return response;
  };

  return {
    ...requestAPI,
    request,
  };
}
