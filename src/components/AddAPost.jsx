import { useState } from "react";

const AddAPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const addAPostHandler = (event) => {
    event.preventDefault();

    console.log("Post added");
    setTitle("");
    setContent("");
    setStatus("published");
  };

  return (
    <div className="container mx-auto bg-white-smoke min-h-screen py-8 px-8">
      <h2 className="text-4xl font-semibold text-nero mb-6 text-center">
        Add a new post
      </h2>
      <form
        onSubmit={addAPostHandler}
        className="bg-white-smoke p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block font-medium text-nero text-lg mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-chetwode-blue rounded-md focus:outline-none focus:ring-2 focus:ring-east-side"
            value={title}
            onChange={titleChangeHandler}
            required
            placeholder="Enter the title of the post"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block font-medium text-nero text-lg mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            className="w-full p-2 border border-chetwode-blue rounded-md focus:outline-none focus:ring-2 focus:ring-east-side"
            value={content}
            onChange={contentChangeHandler}
            required
            placeholder="Write what is on your mind here"
            rows="5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="status"
            className="block font-medium text-nero text-lg mb-2"
          >
            Status
          </label>
          <select
            id="status"
            className="w-full p-2 border border-chetwode-blue rounded-md focus:outline-none focus:ring-2 focus:ring-east-side"
            value={status}
            onChange={statusChangeHandler}
          >
            <option value="published">Publish</option>
            <option value="draft">Save as draft</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-chetwode-blue text-white-smoke rounded-md shadow-md hover:bg-east-side hover:text-nero transition-colors duration-300"
        >
          Save post
        </button>
      </form>
    </div>
  );
};

export default AddAPost;
