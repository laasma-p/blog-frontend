import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const AddAPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");

  const { postId } = useParams();
  const navigate = useNavigate();

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/admin/${postId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch the post");
          }

          const post = await response.json();
          setTitle(post.title);
          setContent(post.content);
          setStatus(post.status);
        } catch (error) {
          console.error("Error fetching the post:", error.message);
        }
      }
    };

    fetchPost();
  }, [postId]);

  const addOrEditAPostHandler = async (event) => {
    event.preventDefault();

    const method = postId ? "PUT" : "POST";

    const url = postId
      ? `http://localhost:3000/api/admin/edit-post/${postId}`
      : "http://localhost:3000/api/admin/add-a-post";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, content, status }),
      });

      if (!response.ok) {
        throw new Error(
          postId ? "Failed to update the post" : "Failed to add a post"
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(
        `Error ${postId ? "updating" : "adding"} the post`,
        error.message
      );
    }
  };

  return (
    <div className="bg-white-smoke min-h-screen">
      <div className="container mx-auto py-8 px-8 flex flex-col lg:flex-row lg:gap-4 gap-2">
        <div
          className={`w-full p-4 border-border-chetwode-blue ${
            content ? "lg:w-1/2" : "lg:w-full max-w-4xl mx-auto"
          }`}
        >
          <h2 className="text-4xl font-semibold text-nero mb-6 text-center">
            {postId ? "Edit post" : "Add a new post"}
          </h2>
          <form
            onSubmit={addOrEditAPostHandler}
            className="bg-white-smoke p-4 rounded-lg shadow-lg mx-auto"
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
              {postId ? "Update post" : "Add post"}
            </button>
          </form>
        </div>
        {content && (
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 p-4">
            <h2 className="text-4xl font-semibold text-nero mb-6 text-center">
              Post preview
            </h2>
            <div className="bg-white-smoke p-4 rounded-lg shadow-md break-all">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAPost;
