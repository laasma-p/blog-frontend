import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setErrorMessage(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${postId}`
        );

        if (!response.ok) {
          setErrorMessage("The post does not exist or has been removed.");
        } else {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        setErrorMessage(
          error.message ||
            "An unexpected error occured while fetching the post."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="bg-white-smoke min-h-screen flex justify-center items-center">
        <p className="text-xl text-nero">Loading post...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-white-smoke text-center">
        <h2 className="text-3xl font-bold text-nero mt-56 mb-4">
          404 Not Found
        </h2>
        <p className="text-lg text-nero mb-4">{errorMessage}</p>
        <Link
          to="/"
          className="text-lg text-dark-purple hover:text-bright-purple transition-colors duration-300"
        >
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white-smoke h-dvh">
      <div className="max-w-4xl mx-auto p-6 text-nero">
        <Link
          to="/"
          className="hover:text-bright-purple transition-colors duration-300"
        >
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <span className="mb-6">
          <em>
            Written on{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            by{" "}
            <Link
              to="/about-me"
              className="font-bold text-bright-purple hover:underline"
            >
              {post.admin.firstName}
            </Link>{" "}
            |{" "}
          </em>
          {post.editDate && post.editDate !== post.date && (
            <>
              Edited on{" "}
              <strong>
                {new Date(post.editDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </>
          )}
        </span>
        <ReactMarkdown className="text-lg pt-3">{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Post;
