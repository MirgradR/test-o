type Props = {
  url: string;
  params?: Record<string, string | number | undefined>;
};

/**
 * Обогощает URL query-параметрами для запроса
 * ?key1=value1&key2=value2&key3=value3
 */
export function addParamsToUrl({ url, params = {} }: Props) {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== "");

  entries.forEach(([key, value], idx) => {
    url += idx === 0 ? `?${key}=${value}` : `&${key}=${value}`;
  });

  return url;
}
