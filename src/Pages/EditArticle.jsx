import React, { useState } from "react";

export const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (status) => {
    setLoading(true);

    setTimeout(() => {
      alert(`Post saved as ${status}!\n\nTitle: ${title}\nCategory: ${category}\nContent: ${content}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen p-6 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>

      <div className="w-full sm:w-3/4 lg:w-2/3">
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Content</label>
          <textarea className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" rows="6" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content"></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Category</label>
          <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button onClick={() => handleSubmit("Published")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50" disabled={loading}>
            {loading ? "Publishing..." : "Publish"}
          </button>

          <button onClick={() => handleSubmit("Draft")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50" disabled={loading}>
            {loading ? "Saving Draft..." : "Draft"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
