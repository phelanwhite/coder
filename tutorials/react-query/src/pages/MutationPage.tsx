import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const MutationPage = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createResult.mutate();
  };
  const createResult = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        }
      );
      return await response.json();
    },
    onSuccess: (data) => {
      setFormValue({
        title: "",
        body: "",
        userId: 1,
      });
    },
    onError: (error) => {
      alert(`Error creating post: ${error.message}`);
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <input
          required
          className="px-4 py-2 rounded border"
          title="title"
          name="title"
          placeholder="Title"
          type="text"
          value={formValue.title}
          onChange={handleChangeInput}
        />
        <textarea
          required
          className="px-4 py-2 rounded border"
          title="body"
          name="body"
          placeholder="Body"
          value={formValue.body}
          onChange={handleChangeInput}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Create post
        </button>
      </form>
      {createResult.isPending && <p>Loading...</p>}
      <div className="mt-4 border-t pt-4">
        <div>Title: {createResult.data?.title}</div>
        <div>Body: {createResult.data?.body}</div>
      </div>
    </div>
  );
};

export default MutationPage;
