import React, { useContext, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { deleteUserById, deleteCognitoUserById } from "../../utils/Api";
import grey from "@material-ui/core/colors/grey";
import { /*APIContext, */AuthContext } from "../../App";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Auth } from 'aws-amplify';
// import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import AccountProfile from './AccountProfile';
import AccountDetails from './AccountDetails';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles1 = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  card: {
    minWidth: 200,
    margin: 10,
    marginBottom: 25,
    color: grey,
    backgroundColor: grey,
    boxShadow: "0 0 5px #e0e0e0",
  },
  title: {
    textAlign: "left",
    color: "black",
  },
  content: {
    textAlign: "left",
  },
  pos: {
    backgroundColor: grey
  },
  button2: {
    background: "white",
    borderRadius: "1.75em",
    borderWidth: 1,
    height: "4em",
    width: '100%', // Fix IE 11 issue.
    fontWeight: "unset",
    marginTop: theme.spacing(1.5),
  }
}));

export default function Settings() {
  const classes1 = useStyles1();
  // const value = useContext(APIContext);
  const currentUser = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [state, setState] = useState(false);
  const [radioChecked, setRadioChecked] = useState('');
  const [deletionToast, setDeletionToast] = useState(false);

  async function handleDeleteUser() {
    if (radioChecked === 'delete') {
      try {
        await deleteUserById(currentUser.user.attributes.sub);
        await deleteCognitoUserById(currentUser.user.attributes.sub);
        await Auth.signOut();
        setDeletionToast(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      setMessage("Select the 'Delete Account' button to remove your account from WeatherSafe.");
      setOpenFail(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (deletionToast) {
      window.location.reload();
    }
    setOpen(false);
    setOpenFail(false);
  };

  const handleArrowDropDown = () => {
    if (state === false) {
      setState(true);
    } else {
      setState(false);
    }
  };

  function DeleteAccountOption(props) {
    function RadioButtonContent() {
      return (
        <Typography variant="subtitle2">
          {'Delete Account'}
        </Typography>
      );
    }
    const handleRadioChange = (event) => {
      setRadioChecked(event.target.value);
    }

    return (
      (props.state) ?
        <>
          <br />
          <Container style={{ paddingTop: "15px" }} maxWidth="xs">
            <FormControlLabel
              value="delete"
              control={<Radio color="primary" />}
              label={<RadioButtonContent />}
              onChange={handleRadioChange}
            />
            <br />
            <br />
            <Button
              fullWidth
              className={classes1.button2}
              variant="outlined"
              color="primary"
              onClick={handleDeleteUser}
            >
              Confirm Delete Account
            </Button>
            <Snackbar open={deletionToast} autoHideDuration={6000} onClose={handleClose}>
              <Alert style={{ backgroundColor: "#66bb6a" }} icon={false}>
                We're sorry to see you go! Your WeatherSafe account has now been deleted.
              </Alert>
            </Snackbar>
          </Container>
        </>
        : <></>
    );
  }

  function IconButtonUpDown(props) {
    return (
      (props.state) ?
        <>
          <IconButton size="small" onClick={handleArrowDropDown}>
            <ArrowDropUpIcon></ArrowDropUpIcon>
          </IconButton>
        </>
        :
        <>
          <IconButton size="small" onClick={handleArrowDropDown}>
            <ArrowDropDownIcon></ArrowDropDownIcon>
          </IconButton>
        </>
    );
  }

  return (
    <>
      <NavBar></NavBar>
      <div className={classes1.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={4}
            md={6}
            xl={4}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <AccountDetails />
          </Grid>
        </Grid>
      </div>
      <div className={classes1.pos}>
        <Container maxWidth="md">
          <Card >
            <CardContent>
              <Typography className={classes1.title} variant="h5" component="h2">
                Account Ownership
              </Typography>
              <br />
              <br />
              <div style={{ display: "inline-flex", width: "100%" }}>
                <Grid item xs={11}>
                  <Typography className={classes1.title} color="textSecondary">
                    DELETE ACCOUNT
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButtonUpDown state={state}></IconButtonUpDown>
                </Grid>
              </div>
              <br />
              <br />
              <Typography className={classes1.title} style={{ paddingRight: "25px" }} variant="body2" color="textSecondary">
                If you delete your AHAMarché account you will not be able to access your content. You will be able to sign up again at anytime after deleting your account but the content that you had on AHAMarché earlier will no longer exist.
              </Typography>
              <DeleteAccountOption state={state}></DeleteAccountOption>
            </CardContent>
          </Card>
          <br />
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert style={{ backgroundColor: "#66bb6a", textAlign: "left" }} onClose={handleClose}>{message}</Alert>
          </Snackbar>
          <Snackbar open={openFail} autoHideDuration={5000} onClose={handleClose}>
            <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="error">{message}</Alert>
          </Snackbar>
        </Container>
      </div>
    </>
  );
}