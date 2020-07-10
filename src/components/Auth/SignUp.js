import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import UpdateLocation from "../../utils/UpdateLocation";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Auth } from 'aws-amplify';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUpLink() {
  return (
    <Typography variant="body2">
      {'Already have an account? '}
      <Link color="primary" href="/signin" variant="body2" underline="always">
        SIGN IN
      </Link>
    </Typography>
  );
}

function CheckboxContent() {
  return (
    <Typography variant="caption">
      {'I agree to '}
      <Link style={{ lineHeight: "0" }} color="primary" href="/privacy">
        AHAMarché Terms & Conditions
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
    margin: theme.spacing(4, 2),
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
  let history = useHistory();

  var [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [errF, setErrF] = useState(false);
  const [errMessageF, setErrMessageF] = useState('');
  const [errL, setErrL] = useState(false);
  const [errMessageL, setErrMessageL] = useState('');
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [openFail, setOpenFail] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = useState('');
  const [mobileErrorState, setMobileErrorState] = useState(false);
  var routeToSignIn = false; // needs to be changed later

  // eslint-disable-next-line
  const phoneRegExp = /^(\+1)?\(?\d{3}\)?[]?\d{3}[]?\d{4}$/;
  const nameRegExp = /^[A-Za-z]+$/;

  async function signUp() {
    await Auth.signUp({
      username: username,
      password: generatePassword(),
      attributes: {
        'custom:city': selectedLocation.key,
        'custom:firstname': firstName,
        'custom:lastname': lastName
      }
    })
      .then((user) => {
        routeToSignIn = true;
      })
      .catch((err) => {
        let error = err.message.split('error');
        console.log(err.message);
        if (error[1]) {
          setSignUpMessage(`Error signing up: ${error[1]}`);
        } else {
          setSignUpMessage(`Error signing up: ` + err.message);
        }
        setOpenFail(true);
      })
  }

  const generatePassword = () => {
    var result, result1, result2, result3 = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var numbers = '0123456789';
    var specialChars = '!@_"#$%&()*+,-./;:<=>?[]^`{}|~';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var numbersLength = numbers.length;
    for (var j = 0; j < 5; j++) {
      result2 += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    var specialCharsLength = specialChars.length;
    for (var k = 0; k < 5; k++) {
      result3 += specialChars.charAt(Math.floor(Math.random() * specialCharsLength));
    }
    result = result1 + result2 + result3;
    return result;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    username = username.replace(/ /g, "");
    if (username.length === 10) {
      username = '+1' + username;
    }
    if (username.match(phoneRegExp)) {
      setMobileErrorMessage('');
      setMobileErrorState(false);
      if (firstName.match(nameRegExp)) {
        setErrMessageF('');
        setErrF(false);
        if (lastName.match(nameRegExp)) {
          setErrMessageL('');
          setErrL(false);
          if (selectedLocation !== null) {
            if (selectedLocation.length !== 0) {
              if (isChecked) {
                await signUp();
                if (routeToSignIn) {
                  history.push("/signin");
                }
              } else {
                setSignUpMessage('Please check that you agree with AHAMarché Terms & Conditions to proceed further.');
                setOpenFail(true);
              }
            } else {
              setErrMessage("Please select a city");
              setErr(true);
            }
          } else {
            setErrMessage("Please select a city");
            setErr(true);
          }
        } else {
          setErrMessageL('Please enter a valid lastname');
          setErrL(true);
        }
      } else {
        setErrMessageF('Please enter a valid firstname');
        setErrF(true);
      }
    } else {
      setMobileErrorMessage('Please enter a valid phone number');
      setMobileErrorState(true);
    }
  }

  const handleChange = (event, value) => {
    if (event.target.id === 'phone') {
      setUsername(event.target.value);
      setMobileErrorMessage('');
      setMobileErrorState(false);
    }
    if (event.target.id === 'fn') {
      setFirstName(event.target.value);
      setErrMessageF('');
      setErrF(false);
    }
    if (event.target.id === 'ln') {
      setLastName(event.target.value);
      setErrMessageL('');
      setErrL(false);
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Customer Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><p style={{ color: 'black' }}>+1</p></InputAdornment>,
                  }}
                  error={mobileErrorState}
                  helperText={mobileErrorMessage}
                  variant="outlined"
                  autoFocus
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errF}
                  helperText={errMessageF}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fn"
                  label="First Name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errL}
                  helperText={errMessageL}
                  variant="outlined"
                  required
                  fullWidth
                  id="ln"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <UpdateLocation setSelectedLocation={setSelectedLocation} err={err} setErr={setErr} errMessage={errMessage} setErrMessage={setErrMessage}></UpdateLocation>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className={classes.formLabel}
                  control={<Checkbox className={classes.checkbox} value="userAgreed" color="primary" />}
                  label={<CheckboxContent />}
                  onChange={handleCheckboxChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Snackbar open={openFail} autoHideDuration={5000} onClose={handleClose}>
              <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="error">{signUpMessage}</Alert>
            </Snackbar>
            <Grid container justify="center">
              <Grid item>
                <SignUpLink></SignUpLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}