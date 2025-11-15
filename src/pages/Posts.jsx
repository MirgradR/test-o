import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const query = search ? `?q=${search}` : "";

        const res = await fetch(`${BASE_URL}/posts${query}`);
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

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchParams(value ? { search: value } : {});
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="container">
      <h2>Posts</h2>

      <input
        type="text"
        placeholder="Search posts via API..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {posts.length === 0 && (
        <p style={{ marginTop: "1rem", color: "#888" }}>
          No posts found for "<b>{search}</b>"
        </p>
      )}

      <div className="posts">
        {loading ? (
          <Loader />
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <PostModalContent postId={selectedPost} />
        </Modal>
      )} */}
    </section>
  );
};

export default Posts;
