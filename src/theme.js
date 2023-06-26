// import { createTheme } from "@material-ui/core/styles";
import { getCookie } from "./components/utils/HelperFunctions";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// A custom theme for this app
const environment = getCookie("x_environment") ? getCookie("x_environment") : "Test";
const theme = createTheme({
  palette: {
    //type: "light",
    mode: "dark",
    type: "dark",
    primary: {
      main: environment === "Test" ? "#27c5e2" : "#a470ff",
    },
    secondary: {
      main: "#ae00d7",
    },
    error: {
      main: "#f50808",
    },
    // background: {
    //   // default: "rgb(53, 53, 53)",
    //   // default: "#fff",
    // },
  },
});

export default darkTheme;
