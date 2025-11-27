import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
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

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
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

      <input
        type="text"
        placeholder="Search posts..."
        className="search-input"
        value={search}
        onChange={handleSearch}
      />

      <section className="posts">
        {posts.length === 0 && !loading && (
          <p style={{ marginTop: "1rem", color: "#888" }}>No posts found"</p>
        )}

        {loading ? (
          <p>Loading....</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => navigate(`/posts/${post.id}/comments`)}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Posts;
