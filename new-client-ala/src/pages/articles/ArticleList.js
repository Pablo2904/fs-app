import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

export const ArticleList = () => {
  const articles = useLoaderData();

  console.log(articles);
  return (
    <div className="articles">
      {articles.map((article) => (
        <Link to={article.id.toString()} key={article.id}>
          <p>Article about: {article.title}</p>
        </Link>
      ))}
    </div>
  );
};

//data loader
export const articleLoader = async () => {
  try {
    const res = await axios.get("http://localhost:5000/articles");
    return res.data; //zwraca dane z odp.
  } catch (error) {
    console.error("Error fetching articles: ", error);
    throw error;
  }
};
