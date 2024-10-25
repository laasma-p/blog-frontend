import { useState, useEffect } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/posts-list",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const deletePostHandler = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/delete-post/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-chetwode-blue text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Total Posts</h3>
          <p className="text-xl">3</p>
        </div>
        <div className="bg-east-side text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Pinned Posts</h3>
          <p className="text-xl">2</p>
        </div>
        <div className="bg-french-lilac text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Draft Posts</h3>
          <p className="text-xl">1</p>
        </div>
      </div>
      <div>
        <table className="table-auto w-full text-left bg-white-smoke">
          <thead>
            <tr className="bg-chetwode-blue text-white-smoke">
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Pinned</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr className="border-b" key={post.id}>
                  <td className="p-4">{post.title}</td>
                  <td className="p-4">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-4">{post.status}</td>
                  <td className="p-4">
                    <button className="py-1 px-3 rounded bg-french-lilac">
                      Unpin
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="text-nero hover:underline">Edit</button>
                    <button
                      className="ml-4 text-east-side hover:underline"
                      onClick={() => deletePostHandler(post.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
