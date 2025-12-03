import { type Comment } from "../../pages/Comments";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  postId: string | number;
}

export function useGetCommentsForPost(props?: HookProps) {
  const requestAPI = useRequest(props ?? {});

  const request = async (props: RequestProps) => {
    const response = await requestAPI.request<Comment[]>({
      method: "GET",
      url: apiPaths.postComments.get(props.postId),
    });

    return response;
  };

  return {
    ...requestAPI,
    request,
  };
}
