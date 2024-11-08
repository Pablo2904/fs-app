import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      const req = await fetch("http://localhost:5000/articles");
      const data = await req.json();
      setArticles(data);
    };
    const getUsers = async () => {
      const req = await fetch("http://localhost:5000/users");
      const data = await req.json();
      setUsers(data);
    };
    getArticles();
    getUsers();
  }, []);

  return (
    <div className="App">
      {articles.map((article) => {
        console.log(users.find((user) => user.id === article.author).username);
        return (
          <div
            key={article.id}
            style={{
              display: "flex",
              "flex-direction": "column",
            }}
          >
            <div>Title: {article.title}</div>
            <div>Content: {article.content}</div>
            <div>
              author:{" "}
              {users.find((user) => user.id === article.author).username}
            </div>

            <div>{article.created_at}</div>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default App;
