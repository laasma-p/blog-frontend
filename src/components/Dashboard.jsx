import { useState, useEffect } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    pinnedPosts: 0,
    drafts: 0,
  });

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

        const totalPosts = data.length;
        const pinnedPosts = data.filter((post) => post.isPinned).length;
        const drafts = data.filter((post) => post.status === "draft").length;

        setAnalytics({ totalPosts, pinnedPosts, drafts });
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

  const togglePinHandler = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/pin-post/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to pin a post");
      }

      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, isPinned: !post.isPinned } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error pinning a post:", error.message);
    }
  };

  return (
    <div className="container mx-auto py-8 px-8">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-chetwode-blue text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Total Posts</h3>
          <p className="text-xl">{analytics.totalPosts}</p>
        </div>
        <div className="bg-east-side text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Pinned Posts</h3>
          <p className="text-xl">{analytics.pinnedPosts}</p>
        </div>
        <div className="bg-french-lilac text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Draft Posts</h3>
          <p className="text-xl">{analytics.drafts}</p>
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
                  <td className="p-4">
                    {post.status === "published" ? "Published" : "Draft"}
                  </td>
                  <td className="p-4">
                    <button
                      className={`py-1 px-3 rounded ${
                        post.isPinned ? "bg-east-side" : "bg-french-lilac"
                      } ${
                        post.status === "draft"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => togglePinHandler(post.id)}
                      disabled={post.status === "draft"}
                      title={
                        post.status === "draft"
                          ? "Publish first to enable pinning"
                          : ""
                      }
                    >
                      {post.isPinned ? "Unpin" : "Pin"}
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
