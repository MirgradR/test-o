import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";
import { type User } from "./useGetUserById";

export function useGetAllUsers(props?: HookProps) {
  const requestAPI = useRequest(props ?? {});

  const request = async () => {
    const response = await requestAPI.request<User[]>({
      method: "GET",
      url: apiPaths.users.get(),
    });

    return response;
  };

  return {
    ...requestAPI,
    request,
  };
}
