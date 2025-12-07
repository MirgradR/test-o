import React, { useState, Suspense, lazy } from "react";
import { useSearchParams } from "react-router-dom";
import { PostsTabs } from '../configs/postsTabs';

const AllPostsLazy = lazy(() => import('../components/posts/AllPosts'));
const UserPostsLazy = lazy(() => import('../components/posts/UserPosts'));

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get("tab");
    const isCorrect = tab === PostsTabs.ALL || tab === PostsTabs.MY;
    return isCorrect ? tab : PostsTabs.ALL;
  })

  const search = searchParams.get("search") || "";
  const isAllTab = activeTab === PostsTabs.ALL;
  const isUserTab = activeTab === PostsTabs.MY;

  return (
    <div className="container">
      <div className='posts-tabs'>
        <button
          onClick={() => {
            setActiveTab(PostsTabs.ALL);
            setSearchParams({ search, tab: PostsTabs.ALL, })
          }}
          data-active={isAllTab}
        >
          ВСЕ
        </button>
        <button
          onClick={() => {
            setActiveTab(PostsTabs.MY)
            setSearchParams({ search, tab: PostsTabs.MY })
          }}
          data-active={isUserTab}
        >
          МОИ
        </button>
      </div>

      <div>
        {isAllTab && (
          <Suspense fallback={<div>All posts loading...</div>}>
            <AllPostsLazy />
          </Suspense>
        )}

        {isUserTab && (
          <Suspense fallback={<div>My posts loading...</div>}>
            <UserPostsLazy />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Posts;
