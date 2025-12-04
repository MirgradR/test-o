import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { usePostUserPost, } from '../http/hooks';

const Input = React.memo((
  props: {
    value: string;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  }
) => (
  <input
    type="text"
    placeholder="Title"
    value={props.value}
    onChange={props.onChange}
    required
  />
));

const TextArea = React.memo((
  props: {
    value: string;
    onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
  }
) => (
  <textarea
    placeholder="Post content"
    value={props.value}
    onChange={props.onChange}
    required
  />
));

const Button = React.memo((props: { isLoading: boolean }) => (
  <button type="submit" disabled={props.isLoading}>
    {props.isLoading ? "Sending..." : "Send"}
  </button>
));

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

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleBodyChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, body: e.target.value }));
  }, []);

  return (
    <section className="container">
      <h2>Submit your post</h2>

      <form
        onSubmit={handleSubmit}
      >
        <Input
          value={form.title}
          onChange={handleTitleChange}
        />

        <TextArea
          value={form.body}
          onChange={handleBodyChange}
        />

        <Button
          isLoading={postUserPostAPI.isLoading}
        />
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

