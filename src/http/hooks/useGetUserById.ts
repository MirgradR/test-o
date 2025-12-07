import { useCallback } from "react";
import { HookProps, useRequest } from "../core/useRequest";
import { apiPaths } from "../endpoints";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface RequestProps {
  userId: string | number;
}

export function useGetUserById(props?: HookProps) {
  const { request: coreRequest, ...api } = useRequest(props ?? {});

  const request = useCallback(
    async (props: RequestProps) => {
      const response = await coreRequest<User>({
        method: "GET",
        url: apiPaths.user.get(props.userId),
      });

      return response;
    },
    [coreRequest]
  );

  return { ...api, request };
}
