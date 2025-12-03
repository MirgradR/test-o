import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  postId: string | number;
}

export function useGetPostById(props?: HookProps) {
  const requestAPI = useRequest(props ?? {});

  const request = async <D>(props: RequestProps) => {
    const response = await requestAPI.request<D>({
      method: "GET",
      url: apiPaths.post.get(props.postId),
    });

    return response;
  };

  return {
    ...requestAPI,
    request,
  };
}
