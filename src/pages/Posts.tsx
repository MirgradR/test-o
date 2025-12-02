import React, { useEffect, useState, ChangeEvent } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "./Post";
import { SunIcon } from '../components/icons/SunIcon';
import { CountIcon } from '../components/icons/CountIcon';

const Posts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [hightlightPosts, setHightlightPosts] = useState(false);
  const [showPostsCount, setShowPostsCount] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(value ? { search: value } : {});
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const query = search ? `?q=${search}` : "";

        const res = await fetch(`https://jsonplaceholder.typicode.com/posts${query}`);
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
          onClick={() => setHightlightPosts(p => !p)}
          paintIcon={hightlightPosts}
        />

        <button onClick={() => setShowPostsCount(p => !p)}>
          <CountIcon color={showPostsCount ? 'lightgreen' : 'white'} />
        </button>
      </div>

      <section className="posts">
        {posts.length === 0 && !loading && (
          <p style={{ marginTop: "1rem", color: "#888" }}>No posts found</p>
        )}

        {loading ? (
          <p>Loading....</p>
        ) : (
          posts.map((post, idx) => {
            const isOddPost = idx % 2 === 0;

            return (
              <PostCard
                key={post.id}
                post={post}
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

interface HightlightBtnProps {
  onClick: () => void;
  paintIcon?: boolean;
}

function HightlightBtn({ onClick, paintIcon }: HightlightBtnProps) {

  return React.createElement(
    'button',
    { onClick },
    React.createElement(SunIcon, { color: paintIcon ? 'lightgreen' : 'white' })
  );
}

export default Posts;

