import React from "react";

import { Outlet } from "react-router-dom";

export const ArticleLayout = () => {
  return (
    <div>
      <h2>List of available articles</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam
        temporibus voluptatum laboriosam? Ullam in cum explicabo, enim maxime
        eius:
      </p>
      <Outlet />
    </div>
  );
};
