const Post = () => {
  return (
    <div className="bg-white-smoke h-dvh">
      <div className="max-w-4xl mx-auto p-6 text-nero">
        <button className="hover:text-chetwode-blue transition-colors duration-300">
          ← Back to posts
        </button>
        <h1 className="text-4xl font-bold mb-4">Post title</h1>
        <span className="mb-6">
          <em>Written on date</em>
        </span>
        <p className="text-lg">Post content will be here</p>
      </div>
    </div>
  );
};

export default Post;
