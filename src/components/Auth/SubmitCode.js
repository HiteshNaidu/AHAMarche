import React, { useContext, useState } from 'react';
import { postUserById, getUserById } from "../../utils/Api";
import { config } from "../../utils/Config";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import OtpInput from 'react-otp-input';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  otpInput: {
    marginTop: theme.spacing(6),
    width: "1.6em !important",
    height: "1.6em",
    margin: "0 0.1rem",
    fontSize: "2rem",
    font: "inherit",
    borderRadius: "3px",
    border: "1px solid #bdbdbd",
    backgroundColor: "#fafafa", // Looks nice with a diffrent color
  },
  otpFocus: {
    border: "1px solid #42a5f5",
    borderRadius: "3px",
  },
  otpError: {
    border: "1px solid red",
  },
  button: {
    borderRadius: "1.75em",
    height: "4em",
    width: '95%', // Fix IE 11 issue.
    margin: theme.spacing(8, 0, 2),
    fontWeight: "unset",
    color: "white",
  }
}));

export default function SubmitCode(data) {
  const currentUser = useContext(AuthContext);
  const classes = useStyles();
  let history = useHistory();

  const [otpFromUser, setOtpFromUser] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [signInMessage, setSignInMessage] = React.useState('');
  const [openFail, setOpenFail] = React.useState(false);
  const [openOTPFail, setOpenOTPFail] = React.useState(false);
  const [userAttemptsFail, setUserAttemptsFail] = React.useState(false);
  const [userManualAttemptsFail, setUserManualAttemptsFail] = React.useState(false);
  const [userExpired, setUserExpired] = React.useState(false);
  const [err, setErr] = useState(false);
  const [errToast, setErrToast] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [open, setOpen] = useState(false);
  let flag = false;

  // RegEx for verification code validation
  // eslint-disable-next-line
  const codeExp = /^\d{6}$/;

  const handleResendOTP = () => {
    Auth.signIn({
      username: currentUser.user.username,
    })
      .then((user) => {
        currentUser.setUser(user);
        setOpen(true);
        postUserById(user.challengeParam.USERNAME, {
          "cognitoUser": {
            "username": currentUser.user.username,
            "session": user.Session,
          }
        });
      })
      .catch((err) => {
        setSignInMessage("User expired due to page refresh. You will be redirected to sign in page now.");
        setUserExpired(true);
      });
  }

  async function handleOTPSubmit(event) {
    event.preventDefault();

    if (otpFromUser.match(codeExp)) {
      let loginSucceeded = await answerCustomChallenge(otpFromUser);
      if (loginSucceeded) {
        window.location.reload();
      } else {
        if (!flag) {
          setCount(count + 1);
          if (count < 2) {
            setErrMessage("Please enter a valid verification code");
            setErrToast(true);
            setErr(true);
          }
        }
      }
    } else {
      setErrMessage("Please enter your verification code");
      setErrToast(true);
      setErr(true);
    }
  }

  async function answerCustomChallenge(answer) {
    // This will throw an error if it’s the 3rd wrong answer
    let res = Auth.sendCustomChallengeAnswer(currentUser.user, answer)
      .catch((err) => {
        setUserManualAttemptsFail(true);
        let toast = err.message.split("error ");
        if (toast[1]) {
          setSignInMessage(toast[1] + "You will be redirected to sign in page now.");
          setOpenOTPFail(true);
        } else {
          flag = true;
          setSignInMessage("You tried using an expired verification code. You will be redirected to sign in page now.");
          setOpenOTPFail(true);
        }
      });

    // waits for sendCustomChallengeAnswer promise to return
    await res;

    return await isAuthenticated();
  }

  async function isAuthenticated() {
    try {
      await Auth.currentSession();
      return true;
    } catch (error) {
      return false;
    }
  }

  const handleChange = (event) => {
    setOtpFromUser(event);
    setErr(false);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      if (userAttemptsFail || userManualAttemptsFail || userExpired) {
        history.push("/signin");
      }
      return;
    }
    setOpenFail(false);
    setOpenOTPFail(false);
    setErrToast(false);
    setOpen(false);
    if (userAttemptsFail || userManualAttemptsFail || userExpired) {
      history.push("/signin");
    }
  };

  React.useEffect(() => {
    async function signInUsingHyperlink(userId, otp) {
      // rehydrate the CognitoUser
      let data = await getUserById(userId);
      const user = {
        username: data.data.cognitoUser.username,
        session: data.data.cognitoUser.session
      };
      const poolData = {
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID,
      };
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      const userData = {
        Username: user.username,
        Pool: userPool,
      };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      // After this set the session to the previously stored user session
      cognitoUser.Session = user.session;
      // rehydrating the user and sending the auth challenge answer directly will not trigger a new otp
      cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');

      cognitoUser.sendCustomChallengeAnswer(otp, {
        async onSuccess(success) {
          // If we get here, the answer was sent successfully
          window.location.reload();
        },
        onFailure(failure) {
          setUserAttemptsFail(true);
          setSignInMessage("You tried signing in with an invalid link. You'll be redirected to sign in page now.");
          setOpenOTPFail(true);
        },
      });
    }

    // Check for the data from hyperlink
    if (data.location.search.length) {
      if (data.location.search.length === 55) {
        let arr1 = data.location.search.split("?userid=");
        let arr2 = arr1[1].split("&otp=");

        if (arr2[0] && arr2[1]) {
          if (arr2[0].length === 36 && arr2[1].length === 6) {
            signInUsingHyperlink(arr2[0], arr2[1]);
          } else {
            setSignInMessage("The hyperlink used for signing in is not valid.");
            setOpenFail(true);
          }
        }
      } else {
        setSignInMessage("The hyperlink used for signing in is not valid.");
        setOpenFail(true);
      }
    }
    // eslint-disable-next-line
  }, [data.location.search])

  return (
    (data.location.search.length === 55) ?
      <>
        <br />
        <br />
        <br />
        <br />
        <CircularProgress />
        <br />
        <h3>Loading.....</h3>
        <Snackbar open={openOTPFail} autoHideDuration={5000} onClose={handleClose}>
          <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="error">{signInMessage}</Alert>
        </Snackbar>
      </>
      :
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Please enter the 6 digit verification code
          </Typography>
            <OtpInput
              hasErrored={err}
              errorStyle={classes.otpError}
              value={otpFromUser}
              onChange={otp => handleChange(otp)}
              numInputs={6}
              inputStyle={classes.otpInput}
              focusStyle={classes.otpFocus}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleOTPSubmit}
            >
              Sign In
          </Button>
            <Snackbar open={openOTPFail || openFail || userExpired} autoHideDuration={6000} onClose={handleClose}>
              <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="error">{signInMessage}</Alert>
            </Snackbar>
            <Snackbar open={errToast} autoHideDuration={6000} onClose={handleClose}>
              <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="error">{errMessage}</Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert style={{ backgroundColor: "#66bb6a", textAlign: "left" }} onClose={handleClose}>A new verification code has been sent to your phone</Alert>
            </Snackbar>
            <Grid container justify="center">
              <Grid item>
                <Button onClick={handleResendOTP} color="primary">
                  Resend Verification Code
              </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
  );
}