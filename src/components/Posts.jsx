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

  return (
    <div>
      <h2>Posts</h2>
      <div>
        {posts.map((post) => {
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

export default Posts;
