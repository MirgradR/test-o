import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "./Post";
import { CountIcon } from '../components/icons/CountIcon';
import { useGetAllPosts } from '../http/hooks';
import { EnrichProps, withUsers } from '../hoc/withUsers';
import { useBindPostUserIds } from '../hooks/useBindPostUserIds';
import HightlightBtn from '../components/HightlightBtn';

const Posts = ({ users }: EnrichProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [hightlightPosts, setHightlightPosts] = useState(false);
  const [showPostsCount, setShowPostsCount] = useState(false);
  const bindedPostUserIds = useBindPostUserIds(posts, users);

  const getAllPostsAPI = useGetAllPosts();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(value ? { search: value } : {});
  };

  const toggleHighlight = useCallback(() => setHightlightPosts(p => !p), [])

  useEffect(() => {
    getAllPostsAPI
      .request({ search })
      .then(({ data }) => {
        if (data) setPosts(data);
      })
  }, [search]);

  if (getAllPostsAPI.error) {
    return (
      <p style={{ color: "red" }}>
        {getAllPostsAPI.error}
      </p>
    );
  }

  return (
    <div className="container">
      <h2>
        {showPostsCount && `${posts.length} - `}
        Последние посты
      </h2>

      <div className='posts-interactive'>
        <input
          type="text"
          placeholder="Search posts..."
          className="search-input"
          value={search}
          onChange={handleSearch}
        />

        <HightlightBtn
          onClick={toggleHighlight}
          paintIcon={hightlightPosts}
        />

        <button onClick={() => setShowPostsCount(p => !p)}>
          <CountIcon color={showPostsCount ? 'lightgreen' : 'white'} />
        </button>
      </div>

      <section className="posts">
        {posts.length === 0 && !getAllPostsAPI.isLoading && (
          <p style={{ marginTop: "1rem", color: "#888" }}>No posts found</p>
        )}

        {getAllPostsAPI.isLoading ? (
          <p>Loading....</p>
        ) : (
          posts.map((post, idx) => {
            const isOddPost = idx % 2 === 0;
            const user = users.find(u => u.id == +bindedPostUserIds[post.id]);

            return (
              <PostCard
                key={post.id}
                post={post}
                user={user}
                highlight={isOddPost && hightlightPosts}
                onClick={() => navigate(`/posts/${post.id}/comments`)}
              />
            )
          })
        )}
      </section>
    </div>
  );
};

const PostsWithUsers = withUsers(Posts);
export default PostsWithUsers;
