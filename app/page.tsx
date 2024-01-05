
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

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#212a3b",
        width: "100vw",
        height: "100vh",
        padding: 6,
        gap: 6,
      }}
    >
      <CardComponent sx={{p: 2}}>
        {sideBar.map(el => <Typography children={el.label} key={el.value} />)}
      </CardComponent>
      <Grid item xs={"auto"} flex="1">
        <Grid container direction={"column"}>
          <Grid item xs={12}>
            <CardComponent sx={{ p: 1 }}>
              <TextField type="text" placeholder="Search" />
            </CardComponent>
          </Grid>
          Home Page
        </Grid>
      </Grid>
    </Box>
  );
}
