import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "article";

export const AddNew = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (status) => {
    if (!title || !content || !category) {
      setErrorMessage("⚠️ Tolong isi semua field");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(API_URL, {
        title,
        content,
        category,
        status,
      });

      if (response.data.status === 400) {
        setErrorMessage(`⚠️ ${response.data.error}`);
        return;
      }

      setSuccessMessage(`✅ Post berhasil disimpan`);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMessage("❌ gagal menambahkan post coba lagi ya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>

      <div className="w-full sm:w-3/4 lg:w-2/3">
        {errorMessage && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
        {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" disabled={loading} />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Content</label>
          <textarea className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" rows="6" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" disabled={loading}></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Category</label>
          <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" disabled={loading} />
        </div>

        <div className="flex space-x-4">
          <button onClick={() => handleSubmit("publish")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50" disabled={loading}>
            {loading ? "Publishing..." : "Publish"}
          </button>

          <button onClick={() => handleSubmit("draft")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50" disabled={loading}>
            {loading ? "Saving Draft..." : "Save as Draft"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
