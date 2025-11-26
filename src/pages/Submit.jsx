import { useState } from "react";

const Submit = () => {
  const [form, setForm] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      setResponse(data);
      setForm({ title: "", body: "" });
    } catch (error) {
      setError("Failed to send post. Try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <h2>Submit your post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Post content"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {response && (
        <p style={{ color: "green", marginTop: "1rem" }}>
          Post submitted! ID: {response.id}
        </p>
      )}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </section>
  );
};

export default Submit;
