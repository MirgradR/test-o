import { useState } from "react";
import { addParamsToUrl } from "./addParamsToUrl";

const conf = {
  base_url: "https://jsonplaceholder.typicode.com",
};

export interface HookProps {
  initLoading?: boolean;
}

interface RequestProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  body?: Record<string, unknown>;
  params?: Record<string, string | number | undefined>;
}

interface RequestResponse<D> {
  data: D | null;
  error: string | null;
}

export function useRequest({ initLoading = false }: HookProps) {
  const [isLoading, setIsLoading] = useState(initLoading);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const request = async <D>(props: RequestProps): Promise<RequestResponse<D>> => {
    setIsLoading(true);
    setError("");

    try {
      const url = conf.base_url + addParamsToUrl({ url: props.url, params: props.params });
      const headers = { "Content-Type": "application/json" };
      const body: string | undefined = JSON.stringify(props.body);

      const response = await fetch(url, { method: props.method, body, headers });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data: D = await response.json();
      return { data, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      return { data: null, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    clearError,
    isLoading,
    error,
    request,
  };
}
