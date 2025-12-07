import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { usePostUserPost, } from '../http/hooks';
import { createUserPost } from '../utils/storage/createdPostsAPI';
import { siteUserId } from '../configs/userId';
import { useNavigate } from 'react-router-dom';
import { PostsTabs } from '../configs/postsTabs';

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
}

const Submit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<{ title: string; body: string }>({ title: "", body: "" });
  const [response, setResponse] = useState<SubmitResponse | null>(null);
  const [storageError, setStorageError] = useState('')

  const clearForm = useCallback(() => setForm({ title: '', body: '' }), [])

  const saveResponse = useCallback(
    (data: SubmitResponse) => {
      const { title, body } = data;
      const id = Date.now();

      const isSuccess = createUserPost({
        userPost: { title, body, id, userId: siteUserId }
      })

      if (isSuccess) setResponse({ title, body, id })
      else setStorageError('Failed to save data');

      return isSuccess;
    }, [])

  const postUserPostAPI = usePostUserPost();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResponse(null);
    setStorageError('')

    postUserPostAPI
      .request({ body: form })
      .then(({ data }) => {
        if (!data) return;
        const isSuccess = saveResponse(data);
        if (isSuccess) clearForm();
      })
  };

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleBodyChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, body: e.target.value }));
  }, []);

  const saveError = postUserPostAPI.error || storageError;

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
        <p
          style={{
            color: "green",
            marginTop: "1rem",
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}
        >
          <span>Post submitted!</span>
          <button
            onClick={() => navigate(`/posts?tab=${PostsTabs.MY}`)}
          >
            ID: {response.id}
          </button>
        </p>
      )}

      {Boolean(saveError) && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          {saveError}
        </p>
      )}
    </section>
  );
};

export default Submit;

