import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { APIContext, AuthContext } from "../../App";
import { postUserById } from "../../utils/Api";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
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
}));

export default function PrimarySearchAppBar() {
  let history = useHistory();
  const classes = useStyles();

  const value = useContext(APIContext);
  const currentUser = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  async function handleLogout() {
    await Auth.signOut();
    window.sessionStorage.removeItem("cookieMessageRead");
    window.location.reload();
  }

  async function handleProfile() {
    history.push("/profile");
  }

  async function handleDriverView() {
    history.push("/DriverSignUp");
  }

  async function handleSwitch() {
    if (value.isDriverActive === true) {
      await postUserById(currentUser.user.attributes.sub, { "isDriverActive": false });
      window.location.reload();
    } else {
      await postUserById(currentUser.user.attributes.sub, { "isDriverActive": true });
      window.location.reload();
    }
  }

  async function handleHome() {
    history.push("/home");
  }

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
          <MenuItem onClick={handleProfile}>
            <IconButton
              aria-label="show profile"
            >
              <AccountCircleIcon style={{ color: "#424242" }} />
            </IconButton>
            <p>Profile</p>
          </MenuItem>

          {(value.isDriver) ?
            <>
              {(value.isDriverActive) ?
                <>
                  <MenuItem onClick={handleSwitch}>
                    <IconButton
                      aria-label="driver view"
                    >
                      <FaceIcon style={{ color: "#424242" }}></FaceIcon>
                    </IconButton>
                    <p>Switch to User</p>
                  </MenuItem>
                </>
                :
                <>
                  <MenuItem onClick={handleSwitch}>
                    <IconButton
                      aria-label="driver view"
                    >
                      <LocalShippingIcon style={{ color: "#424242" }}></LocalShippingIcon>
                    </IconButton>
                    <p>Switch to Driver</p>
                  </MenuItem>
                </>}
            </>
            :
            <>
              <MenuItem onClick={handleDriverView}>
                <IconButton
                  aria-label="driver view"
                >
                  <LocalShippingIcon style={{ color: "#424242" }}></LocalShippingIcon>
                </IconButton>
                <p>Register as a Driver</p>
              </MenuItem>
            </>}
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
            aria-label="profile"
            color="inherit"
            onClick={handleProfile}
          >
            <Typography style={{ color: "white" }}>Profile</Typography>
          </IconButton>

          {(value.isDriver ?
            <>
              {(value.isDriverActive) ?
                <>
                  <IconButton
                    aria-label="driver view"
                    color="inherit"
                    onClick={handleSwitch}
                  >
                    <Typography>Switch to User</Typography>
                  </IconButton>
                </>
                :
                <>
                  <IconButton
                    aria-label="driver view"
                    color="inherit"
                    onClick={handleSwitch}
                  >
                    <Typography>Switch to Driver</Typography>
                  </IconButton>
                </>}
            </>
            :
            <>
              <IconButton
                aria-label="driver view"
                color="inherit"
                onClick={handleDriverView}
              >
                <Typography>Register as a Driver</Typography>
              </IconButton>
            </>)}
        </>
      );
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={handleHome}
          >
            AHAMarché
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
  );
}