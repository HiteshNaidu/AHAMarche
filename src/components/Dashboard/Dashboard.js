import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Bonus from "./Bonus/Bonus";
import CustomerRatings from "./CustomerRatings/CustomerRatings";
import DeliveriesCompleted from "./DeliveriesCompleted/DeliveriesCompleted";
import TotalEarnings from "./TotalEarnings/TotalEarnings";
import EarningBreakdown from "./EarningBreakdown/EarningBreakdown";
import CompletedDeliveriesList from "./CompletedDeliveriesList/CompletedDeliveriesList";
import Navbar from "../NavBar/NavBar";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

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
      </div>
    </>
  );
};

export default Dashboard;
