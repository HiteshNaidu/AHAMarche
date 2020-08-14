import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AuthContext } from "../../App";
import Bonus from "./Bonus/Bonus";
import CustomerRatings from "./CustomerRatings/CustomerRatings";
import DeliveriesCompleted from "./DeliveriesCompleted/DeliveriesCompleted";
import TotalEarnings from "./TotalEarnings/TotalEarnings";
import EarningBreakdown from "./EarningBreakdown/EarningBreakdown";
import CompletedDeliveriesList from "./CompletedDeliveriesList/CompletedDeliveriesList";
import Navbar from "../NavBar/NavBar";
import { postUserById } from "../../utils/Api";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const currentUser = useContext(AuthContext);

  const [openFailAlert, setOpenFailAlert] = useState(false);
  const [message, setMessage] = useState("");

  // Get driver location upon initial load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        await postUserById(currentUser.user.attributes.sub, { "realLocation": { "latitude": position.coords.latitude, "longitude": position.coords.longitude } });
      },
      function (error) {
        setMessage("You location is not accessible! Please allow AHAMarché to access your location.");
        setOpenFailAlert(true);
      }
    )
    // eslint-disable-next-line
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailAlert(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Bonus />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CustomerRatings />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <DeliveriesCompleted />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalEarnings />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <EarningBreakdown />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CompletedDeliveriesList />
          </Grid>
        </Grid>
        <Snackbar open={openFailAlert} autoHideDuration={5000} onClose={handleClose}>
          <Alert style={{ textAlign: "left" }} severity="error" onClose={handleClose}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Dashboard;
