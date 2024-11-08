import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ArticleDetails = () => {
  const { id } = useParams(); // Pobranie parametru id z adresu URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/articles/${id}`); // Pobranie danych artykułu z backendu na podstawie id
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article: ", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>; // Komunikat ładowania danych
  }

  return (
    <div>
      <h2>Article Details</h2>
      <div>Title: {article.title}</div>
      <div>Content: {article.content}</div>
      <div>Author: {article.author}</div>
      <div>Date: {article.created_at}</div>
    </div>
  );
};

//stary kod
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import dayjs from "dayjs";

// export const ArticleDetails = () => {
//   const { articleId } = useParams(); // Pobieramy articleId z URL
//   const [article, setArticle] = useState(null);

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/articles/${articleId}`
//         );
//         if (response.data) {
//           setArticle(response.data);
//         } else {
//           console.error("Article not found");
//         }
//       } catch (error) {
//         console.error("Error fetching article: ", error);
//       }
//     };

//     fetchArticle();
//   }, [articleId]);

//   return (
//     <div>
//       {article ? (
//         <>
//           <h2>Article Details</h2>
//           <div>Title: {article.title}</div>
//           <div>Content: {article.content}</div>
//           <div>Author: {article.author}</div>
//           <div>
//             Date: {dayjs(article.created_at).format("DD/MM/YYYY HH:mm:ss")}
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };
