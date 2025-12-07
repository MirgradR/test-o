import { ChangeEvent, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CountIcon } from '../icons/CountIcon';
import { PlusIcon } from '../icons/PlusIcon';
import HightlightBtn from './HightlightBtn';
import { useGetAllPosts } from '../../http/hooks';
import { Post } from '../../pages/Post';
import { PostsTabs } from '../../configs/postsTabs';
import LazyOnView from '../LazyOnView';
import { withUsers, WithUsersProps } from '../../hoc/withUsers';
import PostCardAllWrapper from './cards/PostCardAllWrapper';

const PostsBannerLazy = lazy(async () => {
  await new Promise(res => setTimeout(res, 1500));
  return await import("./PostsBanner");
});

const AllPosts = ({ users }: WithUsersProps) => {
  const navigate = useNavigate();
  const { isLoading, error, request } = useGetAllPosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([])
  const [hightlightPosts, setHightlightPosts] = useState(false);
  const [showPostsCount, setShowPostsCount] = useState(false);

  const search = searchParams.get("search") || "";
  const isError = !isLoading && Boolean(error);
  const isEmpty = !isLoading && !posts.length;

  const toggleHighlight = useCallback(() => setHightlightPosts(p => !p), [])

  const getUser = (userID: number) => {
    const user = users.find(u => u.id === userID);

    if (!user) return { name: 'Anonymous', address: 'Russia' }

    const { name, address } = user;
    if (name.length <= 5) return { name, address: address.city }
    if (name.length <= 10) return { name, address: address.street }
    return { name, address: address.zipcode }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(
      value
        ? { search: value, tab: PostsTabs.ALL }
        : { tab: PostsTabs.ALL }
    );
  };

  const onPostDelete = useCallback((removedPostId: number) => {
    setPosts(prev => prev.filter(p => p.id !== removedPostId))
  }, [])

  useEffect(() => {
    request({ search })
      .then(({ data }) => {
        if (data) setPosts(data);
      })

  }, [search, request]);

  return (
    <section>
      <h2>
        {showPostsCount && `${posts.length} - `}
        Последние посты
      </h2>

      <div className='posts-interactive'>
        <input
          type="text"
          placeholder="Search allPosts..."
          className="search-input"
          value={search}
          onChange={handleSearch}
        />

        <button
          onClick={() => navigate(`/submit`)}
        >
          <PlusIcon />
        </button>

        <HightlightBtn
          onClick={toggleHighlight}
          paintIcon={hightlightPosts}
        />

        <button onClick={() => setShowPostsCount(p => !p)}>
          <CountIcon color={showPostsCount ? 'lightgreen' : 'white'} />
        </button>
      </div>

      <div>
        {isLoading && (
          <p>Loading....</p>
        )}

        {isError && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {isEmpty
          ? (
            <p style={{ marginTop: "1rem", color: "#888" }}>
              No posts found
            </p>
          )
          : (
            <div className='posts'>
              {posts.map((post, idx) => {
                const isOddPost = idx % 2 === 0;
                const user = getUser(post.userId);

                return (
                  <PostCardAllWrapper
                    key={post.id}
                    onClick={() => navigate(`/posts/${post.id}/comments`)}
                    onDelete={onPostDelete}
                    post={post}
                    userName={user.name}
                    userAddress={user.address}
                    highlight={isOddPost && hightlightPosts}
                  />
                )
              })}

              <LazyOnView>
                <Suspense fallback={<div>Loading banner...</div>}>
                  <PostsBannerLazy />
                </Suspense>
              </LazyOnView>
            </div>
          )}
      </div>
    </section>
  )
}

const AllPostsWithUsers = withUsers(AllPosts);
export default AllPostsWithUsers;
