import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export const AllPosts = () => {
  const [activeTab, setActiveTab] = useState("Published");
  const [posts, setPosts] = useState([
    { id: 1, title: "React Hooks Guide", category: "Technology", status: "Published" },
    { id: 2, title: "Healthy Eating Habits", category: "Health", status: "Draft" },
    { id: 3, title: "Starting a Business 101", category: "Business", status: "Published" },
  ]);

  const moveToTrash = (id) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, status: "Trashed" } : post)));
  };

  const filteredPosts = posts.filter((post) => post.status === activeTab);

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>

      <div className="flex space-x-4 border-b pb-2">
        {["Published", "Draft", "Trashed"].map((tab) => (
          <button key={tab} className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2">{post.category}</td>
                  <td className="border p-2 flex justify-center space-x-4">
                    <Link to={`/edit-article/${post.id}`} className="text-blue-500">
                      <FiEdit size={20} />
                    </Link>
                    {activeTab !== "Trashed" && (
                      <button className="text-red-500" onClick={() => moveToTrash(post.id)}>
                        <FiTrash2 size={20} />
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
    </div>
  );
};

export default AllPosts;
