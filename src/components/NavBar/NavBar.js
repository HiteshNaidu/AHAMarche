import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MoreIcon from "@material-ui/icons/MoreVert";
import MoreIcon from "@material-ui/icons/Menu";
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import APIContext from "../../App";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    // display: "none",
    // backgroundColor: "white",
    // borderRadius: "0.3em",
    // marginBottom: "8px",
    color: "white",
    maxWidth: 140,
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  appbar: {
    boxShadow: "0px 0px 0px 0px #90caf9, 0px 0px 0px 0px #90caf9, 0px 1px 10px 0px #90caf9",
  }
}));

export default function PrimarySearchAppBar() {
  let history = useHistory();
  const classes = useStyles();

  const value = useContext(APIContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  async function handleLogout() {
    await Auth.signOut();
    window.sessionStorage.removeItem("cookieMessageRead");
    window.location.reload();
  }

  async function handleSettings() {
    history.push("/settings");
  }


  async function handleHome() {
    history.push("/home");
  }

  // const handleProfileMenuOpen = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderSetNotifyMobile = () => {
    if (value && value.isFirstLogin === "true") {
      return null;
    } else {
      return (
        <div>
          <MenuItem onClick={handleSettings}>
            <IconButton
              aria-label="show settings"
              color="inherit"
            >
              <SettingsIcon style={{ color: "#424242" }} />
            </IconButton>
            <p>Settings</p>
          </MenuItem>

          {/* <MenuItem onClick={handleNotification}>
            <IconButton
              aria-label="show new notifications"
              color="inherit"
            ></IconButton>
            <p>Notifications</p>
          </MenuItem> */}
        </div>
      );
    }
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {renderSetNotifyMobile()}

        <MenuItem onClick={handleLogout}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppIcon style={{ color: "#424242" }} />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    </>
  );

  const renderSetNotify = () => {
    if (value && value.isFirstLogin === "true") {
      return null;
    } else {
      return (
        <>
          <IconButton
            aria-label="settings"
            color="inherit"
            onClick={handleSettings}
          >
            <Typography style={{ color: "white" }}>Settings</Typography>
          </IconButton>

          {/* <IconButton
            aria-label="notification"
            color="inherit"
            onClick={handleNotification}
          >
            <Typography>Notifications</Typography>
          </IconButton> */}
        </>
      );
    }
  };

  return (
    // value && (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          {/* <img src="../imgs/WeatherSafeLogo_white.png" alt="logo" className={classes.title} onClick={handleHome} /> */}
          <Typography
            variant="h5"
            className={classes.title}
            onClick={handleHome}
          >
            WalletApp
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {renderSetNotify()}

            <IconButton
              edge="end"
              aria-label="logout current user"
              onClick={handleLogout}
              color="inherit"
            >
              {/* <ExitToApp /> */}
              <Typography style={{ color: "white" }}>Logout</Typography>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              style={{ color: "white" }}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    // )
  );
}