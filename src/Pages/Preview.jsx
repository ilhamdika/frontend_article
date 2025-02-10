import React, { useState } from "react";

const articles = [
  { id: 1, title: "React Hooks Guide", category: "Technology", content: "Introduction to React Hooks...", status: "Published" },
  { id: 2, title: "Healthy Eating Habits", category: "Health", content: "How to eat healthy every day...", status: "Published" },
  { id: 3, title: "Starting a Business 101", category: "Business", content: "Beginner tips for starting a business...", status: "Published" },
  { id: 4, title: "JavaScript Best Practices", category: "Technology", content: "How to write clean JavaScript code...", status: "Published" },
  { id: 5, title: "Yoga for Beginners", category: "Health", content: "The best yoga poses for beginners...", status: "Published" },
  { id: 6, title: "Financial Planning", category: "Finance", content: "How to plan your finances wisely...", status: "Published" },
  { id: 7, title: "Digital Marketing Strategies", category: "Marketing", content: "Top marketing strategies for 2024...", status: "Published" },
  { id: 8, title: "Machine Learning Basics", category: "AI", content: "Introduction to machine learning...", status: "Published" },
  { id: 9, title: "Mindfulness and Meditation", category: "Wellness", content: "How to practice mindfulness...", status: "Published" },
  { id: 10, title: "Building Scalable Apps", category: "Software", content: "How to design scalable applications...", status: "Published" },
  { id: 11, title: "Building Scalable Apps", category: "Software", content: "How to design scalable applications...", status: "Published" },
  { id: 12, title: "Building Scalable Apps", category: "Software", content: "How to design scalable applications...", status: "Published" },
];

const PAGE_SIZES = [5, 10, 20, 50, 100];

const Preview = () => {
  const publishedArticles = articles.filter((article) => article.status === "Published");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZES[0]);
  const totalPages = Math.ceil(publishedArticles.length / itemsPerPage);

  const paginatedArticles = publishedArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 w-full min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Preview Articles</h2>

      {paginatedArticles.length > 0 ? (
        paginatedArticles.map((article) => (
          <div key={article.id} className="border-b pb-4 mb-4">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-500">{article.category}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{article.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No published articles available.</p>
      )}

      <div className="flex justify-between items-center mt-auto pt-4">
        <div>
          <label className="mr-2 text-gray-600 dark:text-gray-300">Show:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Prev
          </button>

          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>

          <button className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
