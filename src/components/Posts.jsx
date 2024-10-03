import { Link } from "react-router-dom";

const Posts = () => {
  const posts = [
    {
      id: 1,
      title: "First impressions of a new city",
      content:
        "This is a lot of content here. It talks about a new city I have moved to.",
      date: "2024-02-21",
    },
    {
      id: 2,
      title: "Thoughts on life currently",
      content:
        "A lot of things are happening and it shows. This post tells all about it.",
      date: "2024-04-05",
    },
    {
      id: 3,
      title: "Thoughts on a movie",
      content:
        "I watch a lot of movies and I would like to review them here. I think it is important to consider different perspectives, and writing is the easiest way for me to do exactly that.",
      date: "2023-09-12",
    },
    {
      id: 4,
      title: "New beginnings",
      content:
        "This is the full content on new beginning. It talks about a lot of stuff, but I am not going to spoil it. Read more by clicking on the button!",
      date: "2024-09-02",
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
      <h2 className="text-3xl pb-4 font-semibold text-nero">Posts</h2>
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
              <p className="mb-2">{truncateContent(post.content, 140)}</p>
              <span className="mb-4">
                <em>Written on {post.date}</em>
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

export default Posts;
