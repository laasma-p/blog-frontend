import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts/pinned");
        const data = await response.json();
        setFeaturedPosts(data);
      } catch (error) {
        console.error("Error fetching featured posts:", error.message);
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
      <div className="grid md:grid-cols-3 gap-4">
        {featuredPosts.map((post) => {
          return (
            <div
              key={post.id}
              className="p-6 border-2 border-east-side rounded-lg shadow-lg text-nero relative"
            >
              <FontAwesomeIcon
                icon={faThumbtack}
                className="absolute top-4 right-4 text-east-side"
              />
              <h3 className="text-2xl font-bold mb-2">
                <Link
                  to={`/post/${post.id}`}
                  className="hover:text-chetwode-blue transition-colors duration-300"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mb-2">{truncateContent(post.content, 140)}</p>
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
    </div>
  );
};

export default FeaturedPosts;
