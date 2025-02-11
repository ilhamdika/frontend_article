import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/article";

const DetailArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useRef(false);

  useEffect(() => {
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

    fetchArticle();
  }, [id]);

  return (
    <div className="p-6 w-full max-w-3xl min-h-screen">
      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {article && (
        <>
          <h2 className="text-3xl font-bold mb-4 break-words">{article.Title}</h2>
          <p className="text-sm text-gray-500 mb-2 break-words">{article.Category}</p>
          <hr className="mb-4" />
          <p className="text-gray-700 text-justify break-words whitespace-pre-wrap">{article.Content}</p>
        </>
      )}
    </div>
  );
};

export default DetailArticle;
