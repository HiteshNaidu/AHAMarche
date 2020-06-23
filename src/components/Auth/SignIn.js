import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { postUserById } from "../../utils/Api";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUpLink() {
  return (
    <Typography variant="body2">
      {"Don't have an account? "}
      <Link color="primary" href="/" variant="body2" underline="always">
        SIGN UP
      </Link>
    </Typography>
  );
}

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
  paper: {
    margin: theme.spacing(8, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    borderRadius: "1.75em",
    height: "4em",
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(8, 0, 2),
    fontWeight: "unset",
    color: "white",
  }
}));

export default function SignInSide() {
  const currentUser = useContext(AuthContext);
  const classes = useStyles();
  let history = useHistory();

  var [username, setUsername] = React.useState('');
  const [signInMessage, setSignInMessage] = React.useState('');
  const [openFail, setOpenFail] = React.useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = React.useState('');
  const [mobileErrorState, setMobileErrorState] = React.useState(false);

  // RegEx for phone number validation
  // eslint-disable-next-line
  const phoneRegExp = /^(\+1)?\(?\d{3}\)?[]?\d{3}[]?\d{4}$/;

  const signIn = () => {
    Auth.signIn({
      username: username,
    })
      .then((user) => {
        currentUser.setUser(user);
        console.log(user);
        postUserById(user.challengeParam.USERNAME, {
          "cognitoUser": {
            "username": username,
            "session": user.Session,
          }
        });
        history.push("/submitcode");
      })
      .catch((err) => {
        let error = err.message.split('error');
        if (error[1]) {
          setSignInMessage(`Error signing in: ${error[1]}`);
        } else {
          setSignInMessage(`Error signing in: ` + err.message);
        }
        setOpenFail(true);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    username = username.replace(/ /g, "");
    if (username.length === 10) {
      username = '+1' + username;
    }
    if (username.match(phoneRegExp)) {
      signIn();
    } else {
      setMobileErrorMessage('Please enter a valid phone number');
      setMobileErrorState(true);
    }
  }

  const handleChange = (event) => {
    if (event.target.id === 'phone') {
      setUsername(event.target.value);
      setMobileErrorMessage('');
      setMobileErrorState(false);
    }
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
            Sign In
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
              label="Mobile Number"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Get Verification Code
            </Button>
            <Snackbar open={openFail} autoHideDuration={5000} onClose={handleClose}>
              <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="error">{signInMessage}</Alert>
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