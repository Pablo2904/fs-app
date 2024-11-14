import React, { useState, useContext, useEffect } from "react";

import axios from "axios";
import { AuthContext } from "./settings/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const ArticleForm = () => {
  //stany formularza
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  //stany walidacji błędów
  const [errors, setErrors] = useState({});

  //context API
  const { user } = useContext(AuthContext);

  //walidacja formularza
  const validateForm = () => {
    let formErrors = {};

    //validate title
    if (!title.trim()) {
      formErrors.title = "Title is required!";
    } else if (title.length < 5 || title.length > 70) {
      formErrors.title = "Title must be between 5 and 70 characters";
    }

    //validate content
    if (!content.trim()) {
      formErrors.content = "Article content is required!";
    } else if (content.length < 1000 || content.length > 5000) {
      formErrors.content = "Content must be between 1000 and 5000 characters";
    }

    // if (!author.trim()) {
    //   formErrors.author = "Author is required";
    // }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  //obsługa formularza
  const handleSubmit = async (e) => {
    e.preventDefault(); //zapobiega przeładowaniu strony

    if (validateForm()) {
      //wysyłanie żądania do serwera
      try {
        const response = await axios.post("http://localhost:5000/articles", {
          title: title.trim(),
          content: content.trim(),
          author: author,
        });

        if (response.status === 201) {
          toast.success("Article added successfully! :)");

          // Czyszczenie pól po pomyślnym dodaniu artykułu
          setTitle("");
          setContent("");
          setAuthor("");
          setErrors({});
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error while adding article:", error);
        toast.error("Failed to add the article. Please try again.");
      }
    } else {
      toast.error("Please fill out the form fields correctly!");
    }
  };

  return (
    <>
      {user ? (
        <form className="article-form">
          <h2 className="add-article-title">Add your article</h2>
          <div>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <span className="error-text">{errors.title}</span>
              )}
            </div>

            <div>
              <textarea
                placeholder="Content of your article"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {errors.content && (
                <span className="error-text">{errors.content}</span>
              )}
            </div>

            <div>
              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              {errors.author && (
                <span className="error-text">{errors.author}</span>
              )}
            </div>

            <button
              type="submit"
              className="add-article-btn"
              onClick={handleSubmit}
            >
              Add Article
            </button>
          </div>
        </form>
      ) : (
        <div className="not-logged-user">
          <p>To add an article, please log in</p>
          <Link to="/login" className="go-to-login-link">
            GO TO LOGIN
          </Link>
        </div>
      )}
    </>
  );
};
