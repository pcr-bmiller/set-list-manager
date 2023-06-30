import logo from "./logo.svg";
import "./App.css";
import React, { Component, useEffect, useRef } from "react";
import Modal from "react-modal";

import SnackbarHandler from "./components/utils/SnackbarHandler";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import SetlistManager from "./components/setlist/Manager";
import Stats from "./components/setlist/Stats";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ToolsIcon from "@material-ui/icons/Build";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PrintIcon from "@mui/icons-material/Print";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import HelpIcon from "@material-ui/icons/Help";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import theme from "./theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CssBaseline2 from "@mui/material/CssBaseline";

import Header from "./components/header/Header";
import Environment from "./components/header/Environment";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    type: "dark",
    primary: {
      main: "#08F",
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
    width: 50,
    position: "relative",
    left: -7,
    paddingRight: 10,
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

function DashboardContent(props) {
  const mounted = useRef();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [main, setMain] = React.useState("Dashboard");
  const [title, setTitle] = React.useState(
    window.location.pathname.split("/")[1].replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setTitle("Setlist Create");
  }, []);
  useEffect(() => {
    if (title === "Tools" || title === "User Generator") {
      setMain("Tools");
      setTitle("User Generator");
    }
    if (title === "Users" || title === "Dashboard Users") {
      setMain("Users");
      setTitle("Dashboard Users");
    }
    if (title === "iOS Users") {
      setMain("Users");
      setTitle("iOS Users");
    }
  });
  return (
    <Box style={{ display: "flex" }}>
      <CssBaseline2 />
      <AppBar
        enableColorOnDark
        position="absolute"
        color="primary"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <LibraryMusicIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <PrintIcon />
            </Badge>
          </IconButton> */}
          <IconButton color="inherit">
            {/* <Environment setTitle={setTitle} setMain={setMain} routeToLogout={props.routeToLogout} />
             */}
            <Header
              setTitle={setTitle}
              setMain={setMain}
              user={props.user}
              routeToLogout={props.routeToLogout}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <a href="/home">
            <img className={clsx(classes.logo)} src="../setlistlogo.png" alt="Recovrr" />
          </a>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            style={{ flexGrow: 1, letterSpacing: 4 }}
          >
            Setlist
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            // component={NavLink}
            activeClassName="section-highlight"
            onClick={() => {
              setTitle("Setlist Manager");
              setMain("Setlist Manager");
            }}
            isActive={(match, location) => {
              if (!match) {
                if (location.pathname === "/home") {
                  return true;
                } else {
                  return false;
                }
              }
              var pathArray = match.url.split("/");

              return pathArray[1] === "dashboard" || pathArray[1] === "home";
            }}
            to={{
              pathname: "/dashboard",
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        style={{
          // backgroundColor: (theme) => theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" style={{ marginTop: 16, marginBottom: 16 }}>
          <Stats />
          <SetlistManager />

          <Copyright style={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

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

          <DashboardContent />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
