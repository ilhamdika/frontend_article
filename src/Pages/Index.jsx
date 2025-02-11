import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "articles";
const LIMIT = 10;

export const AllPosts = () => {
  const [activeTab, setActiveTab] = useState("publish");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [activeTab, page]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/${LIMIT}/${page * LIMIT}?status=${activeTab}`);

      const data = response.data?.data || response.data || [];
      const total = data.length;

      setPosts(data);
      setTotalPages(Math.ceil(total / LIMIT));
    } catch (err) {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  const updatePostStatus = async (id, status) => {
    const confirmMessage = status === "thrash" ? "Apakah yakin ingin memindahkan post ini ke thrash?" : "Apakah yakin ingin mengembalikan post ini?";
    if (window.confirm(confirmMessage)) {
      try {
        await axios.put(`http://localhost:8080/article-status/${id}`, { status });
        alert(status === "thrash" ? "Post moved to thrash successfully." : "Post restored successfully.");
        fetchPosts();
      } catch (err) {
        setError("Failed to update post status.");
        alert("Failed to update post status.");
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>

      <div className="flex space-x-4 border-b pb-2">
        {["publish", "draft", "thrash"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab(tab);
              setPage(0);
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {error && <div className="text-red-500 my-2">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Category</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.ID} className="border-b">
                    <td className="border p-2">{post.Title}</td>
                    <td className="border p-2">{post.Category}</td>
                    <td className="border p-2 flex justify-center space-x-4">
                      <Link to={`/edit-article/${post.ID}`} className="text-blue-500">
                        <FiEdit size={20} />
                      </Link>
                      {activeTab === "publish" && (
                        <button className="text-red-500" onClick={() => updatePostStatus(post.ID, "thrash")}>
                          <FiTrash2 size={20} />
                        </button>
                      )}
                      {activeTab === "thrash" && (
                        <button className="text-green-500" onClick={() => updatePostStatus(post.ID, "publish")}>
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No posts available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 bg-gray-300 rounded" disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button className="px-4 py-2 bg-gray-300 rounded" disabled={posts.length < LIMIT} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPosts;
