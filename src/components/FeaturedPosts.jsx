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

  return (
    <div className="pb-10 px-4">
      <h2 className="text-3xl pt-4 pb-6 font-semibold text-nero">Featured</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featuredPosts.map((post) => {
          return (
            <div
              key={post.id}
              className="p-6 border-2 border-east-side rounded-lg shadow-lg text-nero"
            >
              <h3 className="text-2xl font-bold mb-2">
                <a
                  href="#"
                  className="hover:text-chetwode-blue transition-colors duration-300"
                >
                  {post.title}
                </a>
              </h3>
              <p className="mb-2">{post.content}</p>
              <span className="mb-4">
                <em>Written on {post.date}</em>
              </span>
              <div>
                <a
                  href="#"
                  className="font-semibold hover:text-chetwode-blue transition-colors duration-300"
                >
                  Read more →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedPosts;
