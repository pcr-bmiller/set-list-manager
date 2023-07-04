import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import defaultTheme from "../../theme";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
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
import EditIcon from "@material-ui/icons/Edit";
import Title from "../utils/Title";
import * as Models from "./Models";
import { getCookie, pingTokenBAOBAB, millisToMinutesAndSeconds } from "../utils/HelperFunctions";
function preventDefault(event) {
  event.preventDefault();
}

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}
function StatsContent(props) {
  const [token, setToken] = useState(getCookie("x_baobab_token"));
  const [created, setCreated] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [intervalStarted, setIntervalStarted] = useState(false);
  const mountedRef = useRef(true);
  const [totalDuration, setTotalDuration] = useState("00:00:00");
  const [reRender, setReRender] = useState("key");
  const forceUpdate = useForceUpdate();
  const [setListSelected, setSetListSelected] = useState(getCookie("x_setlist"));
  // const [setList, setSetList] = useState(props.setList);
  // const [setListDetails, setSetListDetails] = useState(props.setListDetails);

  let interval;

  useEffect(() => {
    console.log("setlist details = ", props.setListDetails);
    console.log("setlist = ", props.setList);
    if (getCookie("x_setlist")) {
    }
  }, []);

  useEffect(() => {
    let times = [];
    for (let dur in props.setList) {
      times.push("00:" + props.setList[dur].Duration);
    }

    //const times = ["01:00:01", "01:00:10","01:54:00","01:30:00"]
    if (times.length > 0) {
      let finalSum = times.reduce(
        (sum, curr) => {
          //Obtain the current timestamp as an array of numbers
          //[HRS, MINS, SECS]
          let currTimeStamp = curr.split(":").map((token) => parseInt(token));

          //Add the current seconds to the total seconds so far
          sum[2] += currTimeStamp[2];
          //See how many minutes you got leftover as a result of that addition
          const leftOverMins = Math.floor(sum[2] / 60);
          //Mod by 60, to keep the seconds under 60
          sum[2] %= 60;

          //Add the leftover minutes to the sum operation for minutes
          sum[1] += currTimeStamp[1] + leftOverMins;
          //Similar procedure as above
          const leftOverHours = Math.floor(sum[1] / 60);
          sum[1] %= 60;

          sum[0] += currTimeStamp[0] + leftOverHours;
          sum[0] %= 24;

          return sum;
        },
        [0, 0, 0]
      );

      for (let s in finalSum) {
        if (finalSum[s] < 10) {
          finalSum[s] = "0" + finalSum[s];
        }
      }
      console.log("FINAL SUM = ", finalSum.join(":"));
      setTotalDuration(finalSum.join(":"));
    } else {
      setTotalDuration("00:00:00");
    }
  }, [props.setList]);

  useEffect(() => {
    if (props.setListDetails) {
      console.log("SETTING DETAILS ROW KEY = ", props.setListDetails.rowkey);
      setSetListSelected(props.setListDetails.rowkey);
      setReRender(new Date().getTime());
    }
  }, [props.setListDetails]);

  const saveSetlist = async () => {
    const setListDetails = props.setListDetails;
    const setList = props.setList;
    console.log("setListDetails = ", setListDetails);
    console.log("setList = ", setList);
    if (setListDetails) {
      console.log("setList = ", setList);
      console.log("setListDetails = ", setListDetails);
      let id = setListDetails.rowkey;
      let body = await getSongsBody();
      console.log("body = ", body);
      let response = await Models.patchTable({ table: "SETLIST", id, body });
      props.handleAlert("Setlist Updated!", "success");
      console.log("Patch response = ", response);
    }

    // console.log("songsRead= ", songsRead);
    // if (songsRead) {
    //   // Set All Songs
    //   console.log("set all songs = ", songsRead);
    //   setAllSongs(songsRead);
    // }
  };

  const getSongsBody = async () => {
    let body = {};
    body = { setlist: [...props.setList] };
    body = { Songs: JSON.stringify(body) };
    return body;
  };

  const saveSetlistDetails = async () => {
    const setListDetails = props.setListDetails;
    const setList = props.setList;
    console.log("setListDetails = ", setListDetails);
    console.log("setList = ", setList);
    if (setListDetails) {
      console.log("setList = ", setList);
      console.log("setListDetails = ", setListDetails);
      let id = setListDetails.rowkey;
      let body = { Name: setListDetails.Name };
      let response = await Models.patchTable({ table: "SETLIST", id, body });
      props.handleAlert("Setlist Updated!", "success");
      console.log("Patch response = ", response);
    }
  };

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
              <TableCell>
                {" "}
                <Autocomplete
                  disableClearable
                  key={`${reRender}_setlist`}
                  id="combo-box-demo"
                  options={props.setLists && props.setLists}
                  // defaultValue={props.setLists ? setListSelected : null}
                  // renderOption={(option) => <>{option.label}</>}
                  // getOptionLabel={(option) => option.label}
                  // getOptionSelected={(option, value) => option.value === value.value}
                  defaultValue={
                    props.setLists && props.setList
                      ? props.setLists.find((opt) => {
                          console.log("opt = ", opt);
                          console.log("setListSelected = ", setListSelected);

                          if (opt.value == setListSelected) {
                            console.log("FOUND = ", opt);
                            return opt;
                          }
                        })
                      : null
                  }
                  onChange={(e, val) => {
                    console.log("val = ", val);
                    props.handleSetlist(val);
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </TableCell>
              <TableCell>
                {" "}
                <IconButton
                  color="inherit"
                  onClick={() => {
                    props.setCreateSetListModalOpen(true);
                  }}
                >
                  <Badge badgeContent={0} color="primary">
                    <AddCircleIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  disabled={false}
                  color="inherit"
                  onClick={() => {
                    props.setCreateSetListModalOpen(true);
                  }}
                >
                  <Badge badgeContent={0} color="primary">
                    <EditIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  disabled={props.isDirty ? false : true}
                  color="inherit"
                  onClick={() => {
                    saveSetlist();
                  }}
                >
                  <Badge badgeContent={0} color="primary">
                    <SaveIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={0} color="primary">
                    <SaveAsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={0} color="primary">
                    <PrintIcon />
                  </Badge>
                </IconButton>
              </TableCell>
            </TableCell>

            {/* <TableCell>{created}</TableCell> */}
            <TableCell className="stats-header-text">{props.setList.length}</TableCell>
            <TableCell className="stats-header-text">{totalDuration}</TableCell>
            {/* <TableCell className="right"> */}
            {/* <IconButton color="inherit">
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="error">
                  <LibraryMusicIcon />
                </Badge>
              </IconButton> */}
            {/* <IconButton color="inherit">
                <Badge badgeContent={0} color="error">
                  <PrintIcon />
                </Badge>
              </IconButton> */}
            {/* </TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default function Stats(props) {
  return (
    // TODO: Remove ThemeProvider once makeStyles is removed
    <ThemeProvider theme={defaultTheme}>
      <StatsContent {...props} />
    </ThemeProvider>
  );
}
