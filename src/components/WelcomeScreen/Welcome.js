import React from "react";
import WelcomeStepper from "./WelcomeStepper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(../imgs/logo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  button: {
    borderRadius: "1.75em",
    height: "4em",
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1.5),
    color: "white",
    fontWeight: "unset",
  },
  button2: {
    background: "white",
    borderRadius: "1.75em",
    borderWidth: 1,
    height: "4em",
    width: '100%', // Fix IE 11 issue.
    fontWeight: "unset",
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)",
    marginTop: theme.spacing(1.5),
  }
}));

const Welcome = props => {
  const classes = useStyles();
  let history = useHistory();

  const handleCustomerSignUp = () => {
    history.push("/customersignup");
  };

  const handleDriverSignUp = () => {
    history.push("/Driversignup");
  };

  const handleSignin = () => {
    history.push("/signin");
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div style={{ marginTop: "15px" }}>
            <Container maxWidth="xs">
              <WelcomeStepper></WelcomeStepper>
            </Container>
            <Container maxWidth="xs">
              <Button
                fullWidth
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleCustomerSignUp}>
                Sign Up as a Customer
              </Button>
              <Button
                fullWidth
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleDriverSignUp}>
                Sign Up as a Driver
              </Button>
              <Button
                fullWidth
                className={classes.button2}
                variant="outlined"
                color="primary"
                onClick={handleSignin}>
                Sign In
              </Button>
            </Container>
          </div>
        </Grid>
      </Grid>
    </>
  )
};

export default Welcome;