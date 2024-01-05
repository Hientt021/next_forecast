
import CardComponent from "@/src/common/CardComponent";
import { Box, Grid, TextField, Typography } from "@mui/material";

const sideBar = [
  {
    label: "Weather",
    value: "weather",
  },
  {
    label: "Cities",
    value: "cities",
  },
  {
    label: "Map",
    value: "map",
  },
  {
    label: "Settings",
    value: "settings",
  },
];

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        background: "#212a3b",
        width: "100vw",
        height: "100vh",
        padding: 24,
        gap: 24,
      }}
    >
      <div style={{ flex: "1" }}>
        <Grid container direction={"column"}>
          <Grid item xs={12}>
            <CardComponent sx={{ p: 1 }}>
              <TextField type="text" placeholder="Search" />
            </CardComponent>
          </Grid>
          Home Page
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
