type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export const URL = "http://localhost:3001";

export function getJson<T extends object | null, P = unknown>(
  url: string,
  options?: { body?: T; method: HTTPMethod }
) {
  const { body, method } = options ?? { body: null, method: "GET" };

  return fetch(url, {
    body: body ? JSON.stringify(body) : null,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json() as Promise<P>;
    throw Error(response.statusText);
  });
}