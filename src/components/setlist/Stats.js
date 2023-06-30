import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import defaultTheme from "../../theme";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
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
import Badge from "@mui/material/Badge";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import Title from "../utils/Title";
import { getCookie, pingTokenBAOBAB, millisToMinutesAndSeconds } from "../utils/HelperFunctions";
function preventDefault(event) {
  event.preventDefault();
}
//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}
function IntegrationTableContent() {
  const [token, setToken] = useState(getCookie("x_baobab_token"));
  const [created, setCreated] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [intervalStarted, setIntervalStarted] = useState(false);
  const mountedRef = useRef(true);

  const forceUpdate = useForceUpdate();

  let interval;

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    []
  );

  useEffect(() => {}, []);
  const setlists = [
    { label: "Welcome to Rockville", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];
  return (
    <React.Fragment>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="center">Action</TableCell> */}
            {/* <TableCell align="center">Status</TableCell> */}
            <TableCell>
              <b>Name</b>
            </TableCell>
            {/* <TableCell>Last Modified</TableCell> */}
            <TableCell>
              <b># of Songs</b>
            </TableCell>
            <TableCell>
              <b>Total Duration</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* <TableCell align="center">
              <Button variant="contained" color="primary" onClick={hardRefreshToken}>
                Refresh
              </Button>
            </TableCell> */}
            {/* <TableCell align="center">
              <CheckCircleIcon style={{ color: green[500] }} />
            </TableCell> */}
            <TableCell>
              {" "}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={setlists}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </TableCell>
            {/* <TableCell>{created}</TableCell> */}
            <TableCell>
              {/* <TextField
                id="outlined-read-only-input"
                // label="Read Only"
                defaultValue=""
                InputProps={{
                  readOnly: true,
                }}
              /> */}
            </TableCell>
            <TableCell>
              {/* <TextField
                id="outlined-read-only-input"
                // label="Read Only"
                defaultValue=""
                InputProps={{
                  readOnly: true,
                }}
              /> */}
            </TableCell>
            <TableCell>
              <IconButton color="inherit">
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
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default function IntegrationTable() {
  return (
    // TODO: Remove ThemeProvider once makeStyles is removed
    <ThemeProvider theme={defaultTheme}>
      <IntegrationTableContent />
    </ThemeProvider>
  );
}
