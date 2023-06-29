import logo from "./logo.svg";
import "./App.css";
import React from "react";
import SnackbarHandler from "./components/utils/SnackbarHandler";
// import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import SetListManager from "./components/setlist/SetListManager";

import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@mui/material/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import theme from "./theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4d95f5",
    },
    secondary: {
      main: "#00cbb4",
    },
    error: {
      main: "#f50808",
    },
  },
});
function Copyright(props) {
  return (
    <>
      <br />
      <Typography color="common.white" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://www.rottenbobby.com/">
          Rotten Bobby
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  logo: {
    width: 60,
    position: "relative",
    left: -7,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBarShift: {
    marginLeft: drawerWidth + ` !important`,
    width: `calc(100% - ${drawerWidth}px) !important`,
    transition:
      theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }) + ` !important`,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1 + ` !important`,
    transition:
      theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }) + ` !important`,
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none !important",
  },
  drawerPaper: {
    position: "relative !important",
    whiteSpace: "nowrap !important",
    width: drawerWidth,
    transition:
      theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }) + ` !important`,
    boxSizing: "border-box  !important",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition:
      theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }) + ` !important`,
    width: theme.spacing(7) + ` !important`,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
}));

class App extends React.Component {
  state = {
    data: [],
    showThankYou: false,
  };
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <SnackbarHandler
            open={this.state.alertOpen}
            message={this.state.alertMessage}
            type={this.state.alertType}
            duration={this.state.duration}
            logout={this.routeToLogout}
            closeAlert={() => this.setState({ alertOpen: false })}
          />

          <SetListManager />
          <Copyright />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
