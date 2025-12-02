import { useEffect, useState, ChangeEvent } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "./Post";
import { SunIcon } from '../components/icons/SunIcon';

const Posts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [hightlightPosts, setHightlightPosts] = useState(false);

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
      <h2>Последние посты</h2>

      <div className='posts-interactive'>
        <input
          type="text"
          placeholder="Search posts..."
          className="search-input"
          value={search}
          onChange={handleSearch}
        />

        <button onClick={() => setHightlightPosts(p => !p)}>
          <SunIcon color={hightlightPosts ? 'lightgreen' : 'white'} />
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

export default Posts;

