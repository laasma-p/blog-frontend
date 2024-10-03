import { Link, useLocation } from "react-router-dom";

const Post = () => {
  const location = useLocation();
  const post = location.state;

  return (
    <div className="bg-white-smoke h-dvh">
      <div className="max-w-4xl mx-auto p-6 text-nero">
        <Link
          to="/"
          className="hover:text-chetwode-blue transition-colors duration-300"
        >
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <span className="mb-6">
          <em>Written on {post.date}</em>
        </span>
        <p className="text-lg">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
