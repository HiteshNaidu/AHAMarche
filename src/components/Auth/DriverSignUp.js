import React, { useState } from 'react';
import NavBar from "../NavBar/NavBar";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UpdateCarType from "../../utils/UpdateCarType";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CheckboxContent() {
  return (
    <Typography variant="caption">
      {'I agree to '}
      <Link style={{ lineHeight: "0" }} color="primary" href="/privacy">
        AHAMarché Drivers - Terms & Conditions
      </Link>{'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  paper: {
    margin: theme.spacing(8, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    borderRadius: "1.75em",
    height: "4em",
    width: '100%', // Fix IE 11 issue.
    color: "white",
    fontWeight: "unset",
  },
  formLabel: {
    textAlign: "left",
    marginRight: 0
  },
  checkbox: {
    marginBottom: "auto"
  }
}));

export default function SignUnSide() {
  const classes = useStyles();

  const [selectedType, setSelectedType] = useState([]);
  const [errType, setErrType] = useState(false);
  const [errTypeMessage, setErrTypeMessage] = useState('');
  const [openFail, setOpenFail] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  var routeToDashboard = true; // needs to be changed later

  async function handleSubmit(event) {
    event.preventDefault();

    if (selectedType !== null) {
      if (selectedType.length !== 0) {
        if (isChecked) {
          // Post to DB
          // display a success toast to the user on successful registeration
          if (routeToDashboard) {
            window.location.reload();
          }
        } else {
          setSignUpMessage('Please check that you agree with AHAMarché Drivers - Terms & Conditions to proceed further.');
          setOpenFail(true);
        }
      } else {
        setErrTypeMessage("Please select a vehicle type");
        setErrType(true);
      }
    } else {
      setErrTypeMessage("Please select a vehicle type");
      setErrType(true);
    }
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFail(false);
  };

  return (
    <>
      <NavBar></NavBar>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Driver Sign up
          </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <UpdateCarType setSelectedType={setSelectedType} errType={errType} setErrType={setErrType} errTypeMessage={errTypeMessage} setErrTypeMessage={setErrTypeMessage}></UpdateCarType>
              <br />
              <FormControlLabel
                className={classes.formLabel}
                control={<Checkbox className={classes.checkbox} value="userAgreed" color="primary" />}
                label={<CheckboxContent />}
                onChange={handleCheckboxChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register me as Driver
            </Button>
              <Snackbar open={openFail} autoHideDuration={5000} onClose={handleClose}>
                <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="error">{signUpMessage}</Alert>
              </Snackbar>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}