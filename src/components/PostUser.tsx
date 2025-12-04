import { useEffect, useState } from 'react';
import { useGetUserById, User } from '../http/hooks';
import { loadJSON, StorageKeys } from '../utils/storage';
import { BindedPostUserIDs } from '../hooks/useBindPostUserIds';

interface Props {
  postId?: string;
}
export function PostUser(props: Props) {
  return (
    <PostUserProvider postId={props.postId}>
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
  postId?: string;
  children: (data: RenderProps) => React.JSX.Element;
}

function PostUserProvider({ postId, children }: ProviderProps) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [user, setUser] = useState<User>();

  const getUserByIdAPI = useGetUserById();
  useEffect(() => {
    if (!postId) return;
    setIsInitializing(true);

    const map = loadJSON(StorageKeys.BINDED_POSTID_USER_ID, {} as BindedPostUserIDs);
    const bindedUserId = map[postId];

    const isAnonymousAuthor = !bindedUserId
    if (isAnonymousAuthor) {
      setIsInitializing(false)
      return;
    }

    getUserByIdAPI.request({ userId: bindedUserId })
      .then(({ data }) => {
        const isAnonymousAuthor = !data
        if (isAnonymousAuthor) {
          setIsInitializing(false)
          return;
        }

        setIsInitializing(false)
        setUser(data)
      })
  }, [postId])

  return children({ isInitializing, user })
}
