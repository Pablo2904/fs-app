import { Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Portal } from "@mui/base/Portal";

const NotFound = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("");
  };

  return (
    <Grid container alignContent="center" direction="column">
      <h3>404 Nie znaleziono strony 404</h3>
      <div>
        Wroc do strony glownej //zaimplementowac powrot do strony glownej!!
      </div>
      <Button onClick={onButtonClick} variant="outlined" size="large">
        Powrot do storny glownej
      </Button>
    </Grid>
  );
};

export default NotFound;
