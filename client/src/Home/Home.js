import { Grid } from "@material-ui/core";

import useArticles from "../API/useArticles";

function Home() {
  const { data: articles, loading, error } = useArticles("GET");

  if (error) {
    return <Grid>Wystąpił, spróbuje ponownie później!</Grid>;
  }

  if (loading) {
    return <Grid>Ładowanie....</Grid>;
  }

  return (
    <Grid container direction="column" spacing={4}>
      {articles.map(({ id, title, content, author }) => {
        return (
          <Grid key={id} item>
            <Grid item>title: {title}</Grid>
            <Grid item>content: {content}</Grid>
            <Grid item>author: {author}</Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Home;
