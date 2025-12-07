import { useCallback } from "react";
import { SubmitResponse } from "../../pages/Submit";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

interface RequestProps {
  body: Record<string, unknown>;
}

export function usePostUserPost(props?: HookProps) {
  const { request: coreRequest, ...api } = useRequest(props ?? {});

  const request = useCallback(
    async (props: RequestProps) => {
      const response = await coreRequest<SubmitResponse>({
        method: "POST",
        url: apiPaths.posts.get(),
        body: props.body,
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}
