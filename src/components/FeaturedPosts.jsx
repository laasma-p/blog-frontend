import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts/pinned");

        if (!response.ok) {
          throw new Error("Failed to fetch the featured posts.");
        }

        const data = await response.json();
        setFeaturedPosts(data);
      } catch (error) {
        setErrorMessage(
          error.message || "An unexpected error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
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
      <h2 className="text-3xl py-4 font-semibold text-nero">Featured</h2>
      {loading ? (
        <p className="text-lg">Loading featured posts...</p>
      ) : errorMessage ? (
        <p className="text-lg text-bright-red">{errorMessage}</p>
      ) : featuredPosts.length === 0 ? (
        <p className="text-lg">No featured posts found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {featuredPosts.map((post) => {
            return (
              <div
                key={post.id}
                className="py-5 px-4 border-2 border-dark-purple rounded-lg text-nero relative max-w-full"
              >
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className="absolute top-4 right-4 text-dark-purple"
                />
                <h3 className="text-2xl font-bold mt-3 mb-2 break-words">
                  <Link
                    to={`/post/${post.id}`}
                    className="hover:text-bright-purple transition-colors duration-300"
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
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </em>
                </span>
                <div>
                  <Link
                    to={`/post/${post.id}`}
                    className="font-semibold hover:text-bright-purple transition-colors duration-300"
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

export default FeaturedPosts;
