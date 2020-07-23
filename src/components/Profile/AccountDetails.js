import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { APIContext } from '../../App';
import UpdateLocation from "../../utils/UpdateLocation";
import UpdateCarType from "../../utils/UpdateCarType";
import { makeStyles } from '@material-ui/styles';
import { AuthContext } from "../../App";
import { postUserById } from '../../utils/Api';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;
  const value = useContext(APIContext);
  const currentUser = useContext(AuthContext);
  const classes = useStyles();

  const [selectedLocation, setSelectedLocation] = useState(value.cityItem);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [selectedType, setSelectedType] = useState(value.vehicleType);
  const [errType, setErrType] = useState(false);
  const [errTypeMessage, setErrTypeMessage] = useState('');
  const [open, setOpen] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (value.vehicleType !== "") {
      if (selectedType !== null) {
        if (selectedType.length !== 0) {
          if (selectedLocation !== null) {
            if (selectedLocation.length !== 0) {
              await postUserById(currentUser.user.attributes.sub, { "vehicleType": selectedType });
              await postUserById(currentUser.user.attributes.sub, { "cityItem": selectedLocation });
              await postUserById(currentUser.user.attributes.sub, { "city": selectedLocation.name_e });
              setOpen(true);
            } else {
              setErrMessage("Please select a city");
              setErr(true);
            }
          } else {
            setErrMessage("Please select a city");
            setErr(true);
          }
        } else {
          setErrTypeMessage("Please select a vehicle type");
          setErrType(true);
        }
      } else {
        setErrTypeMessage("Please select a vehicle type");
        setErrType(true);
      }
    } else {
      if (selectedLocation !== null) {
        if (selectedLocation.length !== 0) {
          await postUserById(currentUser.user.attributes.sub, { "cityItem": selectedLocation });
          setOpen(true);
        } else {
          setErrMessage("Please select a city");
          setErr(true);
        }
      } else {
        setErrMessage("Please select a city");
        setErr(true);
      }
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <CardHeader
            subheader="You can change your details at any time"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  disabled
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={value.firstname}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={value.lastname}
                  variant="outlined"
                />
              </Grid>
              {(!value.vehicleType.length) ?
                <>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      disabled
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={value.username}
                      variant="outlined"
                    />
                  </Grid>
                </> :
                <>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      disabled
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={value.username}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <UpdateCarType setSelectedType={setSelectedType} errType={errType} setErrType={setErrType} errTypeMessage={errTypeMessage} setErrTypeMessage={setErrTypeMessage}></UpdateCarType>
                  </Grid>
                </>}
              <Grid
                item
                md={6}
                xs={12}
              >
                <UpdateLocation setSelectedLocation={setSelectedLocation} err={err} setErr={setErr} errMessage={errMessage} setErrMessage={setErrMessage}></UpdateLocation>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Country"
                  name="country"
                  value="Canada"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Save details
          </Button>
          </CardActions>
        </form>
      </Card>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert style={{ textAlign: "left" }} onClose={handleClose} severity="success">
          Your details have been saved successfully
        </Alert>
      </Snackbar>
    </>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
