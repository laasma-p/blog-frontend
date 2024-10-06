import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${postId}`
        );
        const data = await response.json();

        setPost(data);
      } catch (error) {
        console.error("Error fetching individual post:", error.message);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="bg-white-smoke h-dvh">
      {post ? (
        <div className="max-w-4xl mx-auto p-6 text-nero">
          <Link
            to="/"
            className="hover:text-chetwode-blue transition-colors duration-300"
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
              })}
            </em>
          </span>
          <p className="text-lg">{post.content}</p>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default Post;
