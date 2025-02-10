import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/article";

export const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isMounted = useRef(false);

  const fetchArticle = async () => {
    if (isMounted.current) return;
    isMounted.current = true;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      if (response.data) {
        setArticle(response.data);
      } else {
        throw new Error("Article not found");
      }
    } catch (err) {
      setError("Failed to fetch article");
      console.error("Error fetching article:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleSubmit = async (status) => {
    if (!article.Title || !article.Content || !article.Category) {
      setErrorMessage("⚠️ Tolong isi semua field");
      return;
    }

    setLoading(true);
    setError(null);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.put(`${API_URL}/${id}`, { ...article, status });

      if (response.data.status === 400) {
        setErrorMessage(`⚠️ ${response.data.error}`);
        return;
      }

      setSuccessMessage(`✅ Article berhasil diupdate`);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Failed to update article");
      console.error("Error updating article:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  if (error) return <div className="text-red-500 text-center p-6">{error}</div>;

  if (!article) return null;

  return (
    <div className="w-full min-h-screen p-6 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <div className="w-full sm:w-3/4 lg:w-2/3">
        {errorMessage && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
        {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={article.Title || ""}
            onChange={(e) => setArticle({ ...article, Title: e.target.value })}
            placeholder="Enter title"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Content</label>
          <textarea
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            rows="6"
            value={article.Content || ""}
            onChange={(e) => setArticle({ ...article, Content: e.target.value })}
            placeholder="Enter content"
            disabled={loading}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Category</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={article.Category || ""}
            onChange={(e) => setArticle({ ...article, Category: e.target.value })}
            placeholder="Enter category"
            disabled={loading}
          />
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

export default EditArticle;
