import { useEffect, useState, JSX } from 'react';
import { useGetUserById, User } from '../../http/hooks';

const PostUser = (props: { userId: number }) => {
  return (
    <PostUserProvider
      userId={props.userId}
    >
      {({ isInitializing, user }) => {
        if (isInitializing) {
          return (
            <p className='page-post-user'>
              <span>Loading...</span>
            </p>
          )
        }

        const isAnonymousAuthor = !user;
        if (isAnonymousAuthor) {
          return (
            <p className='page-post-user'>
              <span>Anonymous</span>
              <span>( ОМ )</span>
            </p>
          )
        }

        return (
          <p className='page-post-user'>
            <span>{user.name}</span>
            <span>( {user.company.name} )</span>
          </p>
        )
      }}
    </PostUserProvider>
  )
}

interface RenderProps {
  isInitializing: boolean;
  user?: User;
};

interface ProviderProps {
  userId: number;
  children: (data: RenderProps) => JSX.Element;
}

function PostUserProvider({ userId, children }: ProviderProps) {
  const [user, setUser] = useState<User>();

  const getUserByIdAPI = useGetUserById();
  useEffect(() => {
    getUserByIdAPI.request({ userId })
      .then(({ data }) => {
        if (data) setUser(data)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return children({
    isInitializing: getUserByIdAPI.isLoading,
    user
  })
}

export default PostUser;
