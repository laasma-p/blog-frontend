import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }

    const truncatedContent = content.slice(0, maxLength);
    const lastSpaceIndex = truncatedContent.lastIndexOf(" ");

    return truncatedContent.slice(0, lastSpaceIndex) + "...";
  };

  return (
    <div className="pb-10 px-4">
      <h2 className="text-3xl pb-4 font-semibold text-nero">Posts</h2>
      {posts.length === 0 ? (
        <p className="text-lg">No posts found.</p>
      ) : (
        <div className="max-w-3xl grid gap-4">
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className="p-6 border-2 border-east-side rounded-lg shadow-lg text-nero"
              >
                <h3 className="text-2xl font-bold mb-2">
                  <Link
                    to={`/post/${post.id}`}
                    className="hover:text-chetwode-blue transition-colors duration-300"
                  >
                    {post.title}
                  </Link>
                </h3>
                <ReactMarkdown className="mb-2 break-words max-w-full">
                  {truncateContent(post.content, 140)}
                </ReactMarkdown>
                <span className="mb-4">
                  <em>
                    Written on{" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </em>
                </span>
                <div>
                  <Link
                    to={`/post/${post.id}`}
                    className="font-semibold hover:text-chetwode-blue transition-colors duration-300"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;
