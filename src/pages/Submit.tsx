import { useState, ChangeEvent, FormEvent } from "react";
import { usePostUserPost, } from '../http/hooks';

export interface SubmitResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Submit = () => {
  const [form, setForm] = useState<{ title: string; body: string }>({ title: "", body: "" });
  const [response, setResponse] = useState<SubmitResponse | null>(null);

  const postUserPostAPI = usePostUserPost();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResponse(null);

    postUserPostAPI
      .request({ body: form })
      .then(({ data }) => {
        if (data) setResponse(data);
      })
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

      <form
        onSubmit={handleSubmit}
      >
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

        <button type="submit" disabled={postUserPostAPI.isLoading}>
          {postUserPostAPI.isLoading ? "Sending..." : "Send"}
        </button>
      </form>

      {response && (
        <p style={{ color: "green", marginTop: "1rem" }}>
          Post submitted! ID: {response.id}
        </p>
      )}

      {postUserPostAPI.error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          {postUserPostAPI.error}
        </p>
      )}
    </section>
  );
};

export default Submit;

