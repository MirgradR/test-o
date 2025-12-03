import { SubmitResponse } from "../../pages/Submit";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  body: Record<string, unknown>;
}

export function usePostUserPost(props?: HookProps) {
  const requestAPI = useRequest(props ?? {});

  const request = async (props: RequestProps) => {
    const response = await requestAPI.request<SubmitResponse>({
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
