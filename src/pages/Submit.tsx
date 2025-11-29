import { useState, FormEvent, ChangeEvent } from "react";

interface SubmitResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Submit = () => {
  const [form, setForm] = useState<{ title: string; body: string }>({ title: "", body: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<SubmitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

      const data: SubmitResponse = await res.json();
      setResponse(data);
      setForm({ title: "", body: "" });
    } catch (err) {
      setError("Failed to send post. Try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, body: e.target.value });
  };

  return (
    <section className="container">
      <h2>Submit your post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={handleTitleChange}
          required
        />

        <textarea
          placeholder="Post content"
          value={form.body}
          onChange={handleBodyChange}
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

