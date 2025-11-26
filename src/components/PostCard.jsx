const PostCard = ({ post, onClick }) => {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 50)}...</p>
      <button onClick={onClick}>Read more</button>
    </article>
  );
};

export default PostCard;
