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
  users: {
    get: () => `/users`,
  },
  user: {
    get: (id: string | number) => `/users/${id}`,
  },
} as const;
