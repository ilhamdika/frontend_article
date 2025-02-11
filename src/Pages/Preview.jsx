import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL + "articles/100/0?status=publish";
const ITEMS_PER_PAGE = 10;

const Preview = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);

      setArticles(response.data);
      setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
    } catch (err) {
      setError("Failed to fetch articles");
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6 w-full min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Preview Articles</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {displayedArticles.length > 0 ? (
        displayedArticles.map((article) => (
          <div key={article.ID} className="border-b pb-4 mb-4 w-full max-w-xl hover:bg-gray-100">
            <Link to={`/detail-article/${article.ID}`} key={article.ID} className="border-b pb-4 mb-4 w-full max-w-xl">
              <h3 className="text-xl font-semibold">{article.Title.length > 50 ? `${article.Title.slice(0, 50)}...` : article.Title}</h3>
              <p className="text-sm text-gray-500">{article.Category}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-justify">{article.Content.length > 100 ? `${article.Content.slice(0, 100)}...` : article.Content}</p>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No published articles available.</p>
      )}

      <div className="flex items-center mt-auto pt-4">
        <button className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>

        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>

        <button className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Preview;
