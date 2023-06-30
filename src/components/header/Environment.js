import React, { useEffect } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { getCookie } from "../../components/utils/HelperFunctions";

const styles = StyleSheet.create({
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 14,
    border: "1px solid #DFE0EB",
  },
  container: {
    height: 40,
  },
  cursorPointer: {
    cursor: "pointer",
  },
  name: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "20px",
    textAlign: "right",
    letterSpacing: 0.2,
    marginRight: 15,
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  separator: {
    borderLeft: "1px solid #DFE0EB",
    marginLeft: 32,
    marginRight: 32,
    height: 32,
    width: 2,
    "@media (max-width: 768px)": {
      marginLeft: 12,
      marginRight: 12,
    },
  },
  title: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "30px",
    letterSpacing: 0.3,
    "@media (max-width: 768px)": {
      marginLeft: 36,
    },
    "@media (max-width: 468px)": {
      fontSize: 20,
    },
  },
  iconStyles: {
    cursor: "pointer",
    marginLeft: 25,
    "@media (max-width: 768px)": {
      marginLeft: 12,
    },
  },
  iconSettingsStyles: {
    cursor: "pointer",
    // marginTop: 2,
    display: "inline-block",
    verticalAlign: "middle",
    position: "relative",
    width: 31,
    top: 2,
    // marginLeft: 25,
    "@media (max-width: 768px)": {
      marginLeft: 12,
    },
  },
  iconAvatarStyles: {
    cursor: "pointer",
    // marginTop: 2,
    display: "inline-block",
    verticalAlign: "middle",
    position: "relative",
    // width: 31,
    // top: 2,
    marginLeft: 25,
    "@media (max-width: 768px)": {
      marginLeft: 12,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function Environment(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [environment, setEnvironment] = React.useState("Production");

  const { icon, title, user, ...otherProps } = props;

  const handleChange = (event) => {
    setEnvironment(event.target.value);
    document.cookie = `x_environment=${event.target.value}`;
    window.location.reload();
  };
  useEffect(() => {
    let environment = getCookie("x_environment");
    environment = environment ? environment : "Production";
    setEnvironment(environment);
    document.cookie = `x_environment=${environment}`;
  }, []);

  return (
    <>
      <div>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={environment}
          onChange={handleChange}
          defaultValue="Production"
          label="Environment"
        >
          <MenuItem value="Test">Test</MenuItem>
          <MenuItem value="Production">Production</MenuItem>
        </Select>
      </div>
    </>
  );
}

export default Environment;
