import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { deepOrange, deepPurple, blue } from "@material-ui/core/colors";

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
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));
function Header(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const { icon, title, user, ...otherProps } = props;
  let encodedImg =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  return (
    <>
      <div>
        {/* <div
          aria-owns={anchorEl2 ? "simple-menu" : undefined}
          // aria-haspopup="true"
          onClick={(event) => {
            setAnchorEl2(event.currentTarget);
          }}
          className={css(styles.iconSettingsStyles)}
        >
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div> */}
        <div
          aria-owns={anchorEl2 ? "simple-menu" : undefined}
          // aria-haspopup="true"
          onClick={(event) => {
            setAnchorEl2(event.currentTarget);
          }}
          className={css(styles.iconAvatarStyles)}
        >
          {/* <SettingsIcon /> */}
          {/* <Avatar>BM</Avatar> */}
          {/* <Avatar alt="Rotten Bobby" className={classes.purple} src={`data:image/png;base64, ${encodedImg}`} /> */}

          {/* <IconButton>
            <Avatar
              title={props.user ? props.user.Name : "B"}
              alt={props.user ? props.user.Name : "B"}
              // className={classes.blue}
              src="./profile.jpg"
            />
          </IconButton> */}
        </div>
        {/* <div
        aria-owns={anchorEl2 ? "simple-menu" : undefined}
        aria-haspopup="false"

        className={css(styles.iconAvatarStyles)}
      > */}
        {/* <Avatar>BM</Avatar> */}
        {/* <Avatar alt="Rotten Bobby" className={classes.purple} src={`data:image/png;base64, ${encodedImg}`} /> */}
        {/* <Avatar alt="Rotten Bobby" className={classes.purple} src="./profile.jpg" /> */}
        {/* </div> */}
        <IconButton>
          <img src="../spotify-icon.png" className="spotify-logo" />
        </IconButton>
        {/* <Menu
          id="simple-menu"
          anchorEl={anchorEl2}
          open={Boolean(anchorEl2)}
          onClick={(event) => {
            // setAnchorEl2(null);
          }}
        >
          <MenuItem
            onClick={(event) => {
              // setAnchorEl2(null);
            }}
          >
            <Link
              to={{
                pathname: "/profile",
              }}
              onClick={() => {
                // props.setTitle("Profile");
                // props.setMain("Profile");
              }}
              style={{ color: theme.palette.text.primary }}
            >
              My Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={props.routeToLogout}>Logout</MenuItem>
        </Menu> */}
      </div>
    </>
  );
}

export default Header;
