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
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { cityData } from "../../utils/LatLon";
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';

function SignInLink() {
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
        AHAMarché WeatherSafe Terms & Conditions
      </Link>{'.'}
    </Typography>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        AHAMarché
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  let history = useHistory();

  var [username, setUsername] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({});
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [openFail, setOpenFail] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = useState('');
  const [mobileErrorState, setMobileErrorState] = useState(false);
  var routeToSignIn = true; // needs to be changed later

  // eslint-disable-next-line
  const phoneRegExp = /^(\+1)?\(?\d{3}\)?[]?\d{3}[]?\d{4}$/;

  async function signUp() {
    // await Auth.signUp({
    //   username: username,
    //   password: generatePassword(),
    //   attributes: {
    //     'custom:City': selectedLocation
    //   }
    // })
    //   .then((user) => {
    //     routeToSignIn = true;
    //   })
    //   .catch((err) => {
    //     let error = err.message.split('error');
    //     if (error[1]) {
    //       setSignUpMessage(`Error signing up: ${error[1]}`);
    //     } else {
    //       setSignUpMessage(`Error signing up: ` + err.message);
    //     }
    //     setOpenFail(true);
    //   })
    routeToSignIn = true;
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
      if (selectedLocation) {
        console.log("inside if");
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
        console.log("inside else");
        setErrMessage("Please select a city");
        setErr(true);
      }
    } else {
      setMobileErrorMessage('Please enter a valid phone number');
      setMobileErrorState(true);
    }
  }

  const handleChange = (event, value) => {
    if (event.target.id === 'phone') {
      setUsername(event.target.value);
    } else {
      setSelectedLocation(value);
      console.log(value);
      if (value) {
        setErr(false);
        setErrMessage("");
      }
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
    setOpen(false);
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
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start"><p style={{ color: 'black' }}>+1</p></InputAdornment>,
              }}
              error={mobileErrorState}
              helperText={mobileErrorMessage}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              autoFocus
            />
            <Autocomplete
              id="city"
              options={cityData}
              getOptionLabel={(option) => option.name_e}
              onChange={handleChange}
              renderInput={params => (
                <TextField
                  error={err}
                  helperText={errMessage}
                  {...params}
                  fullWidth
                  label="City"
                  variant="outlined" />)}
            />
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
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <SignInLink></SignInLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}