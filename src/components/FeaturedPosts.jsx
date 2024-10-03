import { Link } from "react-router-dom";

const FeaturedPosts = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "My first reflection",
      date: "2024-09-21",
      content:
        "This is the full content of my first reflection post. This is obviously a placeholder",
    },
    {
      id: 2,
      title: "Thoughts on life",
      date: "2022-01-01",
      content: "Another content about life.",
    },
    {
      id: 3,
      title: "Another insight",
      date: "2023-05-04",
      content:
        "This is the full content of the post. Maybe it should have been longer.",
    },
  ];

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
