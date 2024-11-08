import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Form } from "../Form/Form";
import { ArticleDetails } from "../ArticleDetails/ArticleDetails";

export const Router = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
