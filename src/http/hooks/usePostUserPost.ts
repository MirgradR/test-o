import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  body: Record<string, unknown>;
}

export function usePostUserPost(props?: HookProps) {
  const requestAPI = useRequest(props ?? {});

  const request = async <D>(props: RequestProps) => {
    const response = await requestAPI.request<D>({
      method: "POST",
      url: apiPaths.posts.get(),
      body: props.body,
    });

    return response;
  };

  return {
    ...requestAPI,
    request,
  };
}
