export const apiPaths = {
  posts: {
    get: () => "/posts",
  },
  post: {
    get: (id: string | number) => `/posts/${id}`,
  },
  postComments: {
    get: (id: string | number) => `/posts/${id}/comments`,
  },
} as const;
