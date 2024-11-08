import React from "react";
import { Link, useRouteError } from "react-router-dom";

export const ArticleError = () => {
  const error = useRouteError();

  return (
    <div className="article-error">
      <h2>ERROR</h2>
      <p>{error.message}</p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};
