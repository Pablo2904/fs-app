import { Outlet } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AddAlertIcon from "@mui/icons-material/AddAlert";

function Dashboard() {
  return (
    <Grid
      container
      alignContent="center"
      direction="column"
      style={styles.gridContainer}
    >
      <Grid container justifyContent="center">
        <h1>Header dashboardu</h1>
        <Grid>
          <Link to={"/login"}>
            <Button variant="outlined"> zaloguj się</Button>
          </Link>
          <Link to={"/Home"}>
            <Button variant="contained"> HOME </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid item xs style={styles.middleContent}>
        <Outlet />
      </Grid>
      <Grid container justifyContent="center">
        <footer>Footer links</footer>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

const styles = {
  gridContainer: {
    height: "100vh",
  },
  middleContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Vertical centering
    textAlign: "center", // Horizontal centering
  },
};
