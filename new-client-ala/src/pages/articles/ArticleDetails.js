//chcemy tu uzykać dostęp do parametru id
import React from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";
import axios from "axios";

export const ArticleDetails = () => {
  const { id } = useParams();
  const article = useLoaderData();

  // // Sprawdź, czy dane artykułu są załadowane
  // if (!article) {
  //   return <div>Loading...</div>; // lub inny komunikat o ładowaniu
  // }
  console.log("Tytuł: ", article.title);

  return (
    <div className="article-details">
      <Link to="/articles" style={{ "font-size": "11px" }}>
        Back to the list of available articles
      </Link>
      <h2>Article Details:</h2>
      <h3>Tytuł: {article.title}</h3>
      <p>Treść: {article.content}</p>
    </div>
  );
};

//details data loader
export const articleDetailsLoader = async ({ params }) => {
  const { id } = params;

  try {
    const res = await axios.get("http://localhost:5000/articles/" + id);
    const article = res.data.find((article) => article.id === parseInt(id));
    return article;
    // return res.data;
  } catch (error) {
    console.error("Error fetching article details: ", error);
    throw error;
  }
};
