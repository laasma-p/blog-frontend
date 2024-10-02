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
    <div>
      <h2>Featured</h2>
      <div>
        {featuredPosts.map((post) => {
          return (
            <div key={post.id}>
              <h3>
                <a href="#">{post.title}</a>
              </h3>
              <p>{post.content}</p>
              <span>
                <em>Written on {post.date}</em>
              </span>
              <a href="#">Read more →</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedPosts;
