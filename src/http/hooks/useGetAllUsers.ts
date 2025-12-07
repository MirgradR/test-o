import { useCallback } from "react";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";
import { type User } from "./useGetUserById";

export function useGetAllUsers(props?: HookProps) {
  const { request: coreRequest, ...api } = useRequest(props ?? {});

  const request = useCallback(async () => {
    const response = await coreRequest<User[]>({
      method: "GET",
      url: apiPaths.users.get(),
    });

    return response;
  }, [coreRequest]);

  return { ...api, request };
}
