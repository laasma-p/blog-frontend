import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    pinnedPosts: 0,
    drafts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

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

        setAnalytics({
          totalPosts: data.length,
          pinnedPosts: data.filter((post) => post.isPinned).length,
          drafts: data.filter((post) => post.status === "draft").length,
        });

        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          error.message || "Unexpected error occurred. Please try again."
        );
      } finally {
        setLoading(false);
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
        throw new Error("Failed to delete post.");
      }

      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post.id !== postId);

        setAnalytics({
          totalPosts: updatedPosts.length,
          pinnedPosts: updatedPosts.filter((post) => post.isPinned).length,
          drafts: updatedPosts.filter((post) => post.status === "draft").length,
        });

        return updatedPosts;
      });

      setSuccessMessage("Post deleted successfully.");
    } catch (error) {
      setErrorMessage(
        error.message || "Unexpected error occurred. Please try again."
      );
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
        throw new Error("Failed to pin a post.");
      }

      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) =>
          post.id === postId ? { ...post, isPinned: !post.isPinned } : post
        );

        setAnalytics({
          totalPosts: updatedPosts.length,
          pinnedPosts: updatedPosts.filter((post) => post.isPinned).length,
          drafts: updatedPosts.filter((post) => post.status === "draft").length,
        });

        return updatedPosts;
      });

      const updatedPost = posts.find((post) => post.id === postId);
      setSuccessMessage(
        !updatedPost.isPinned ? "Post pinned." : "Post unpinned."
      );
    } catch (error) {
      setErrorMessage(
        error.message || "Unexpected error occurred. Please try again."
      );
    }
  };

  const editPostHandler = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div className="bg-white-smoke min-h-screen py-8 px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-dark-purple text-white-smoke p-4 rounded-lg">
            <h3 className="text-2xl">Total Posts</h3>
            <p className="text-xl">{analytics.totalPosts}</p>
          </div>
          <div className="bg-dark-purple text-white-smoke p-4 rounded-lg">
            <h3 className="text-2xl">Pinned Posts</h3>
            <p className="text-xl">{analytics.pinnedPosts}</p>
          </div>
          <div className="bg-dark-purple text-white-smoke p-4 rounded-lg">
            <h3 className="text-2xl">Draft Posts</h3>
            <p className="text-xl">{analytics.drafts}</p>
          </div>
        </div>
        <div>
          {successMessage && (
            <p className="text-bright-green text-lg pb-3">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-bright-red text-lg pb-3">{errorMessage}</p>
          )}
          {loading ? (
            <p className="text-lg">Loading posts list...</p>
          ) : posts.length === 0 ? (
            <p className="text-lg">No posts found.</p>
          ) : (
            <table className="table-auto w-full bg-white-smoke border-x">
              <thead>
                <tr className="bg-bright-purple text-white-smoke">
                  <th className="p-4 w-1/2">Title</th>
                  <th className="p-4 w-1/6">Date</th>
                  <th className="p-4 w-1/6">Status</th>
                  <th className="p-4 w-1/12">Pinned</th>
                  <th className="p-4 w-1/12">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  return (
                    <tr className="border-b" key={post.id}>
                      <td className="p-4">{post.title}</td>
                      <td className="p-4">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
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
                            post.isPinned
                              ? "bg-light-purple text-nero"
                              : "bg-dark-purple text-white-smoke"
                          } ${
                            post.status === "draft"
                              ? "opacity-50 cursor-not-allowed"
                              : !post.isPinned && analytics.pinnedPosts >= 3
                              ? "opacity-75 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => togglePinHandler(post.id)}
                          disabled={
                            post.status === "draft" ||
                            (!post.isPinned && analytics.pinnedPosts >= 3)
                          }
                          title={
                            post.status === "draft"
                              ? "Publish first to enable pinning"
                              : !post.isPinned && analytics.pinnedPosts >= 3
                              ? "Maximum pinned posts reached"
                              : ""
                          }
                        >
                          {post.isPinned ? "Unpin" : "Pin"}
                        </button>
                      </td>
                      <td className="p-4 flex flex-col lg:flex-row">
                        <div className="justify-center items-center">
                          <button
                            className="mx-4 text-nero hover:underline"
                            onClick={() => editPostHandler(post.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="mx-4 text-bright-purple hover:underline"
                            onClick={() => deletePostHandler(post.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
