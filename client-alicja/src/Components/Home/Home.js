import React, { useState } from "react";
import { ArticleList } from "../ArticleList/ArticleList";
import ArticleDetails from "../ArticleDetails/ArticleDetails";
import { Route, Routes } from "react-router-dom";

export const Home = () => {
  // const [articles, setArticles] = useState([]);
  return (
    <div>
      <h2>List of Articles:</h2>
      <ArticleList />
    </div>
  );
};
