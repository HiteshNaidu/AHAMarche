import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { APIContext } from '../../App';
import UpdateLocation from "../../utils/UpdateLocation";
import UpdateCarType from "../../utils/UpdateCarType";
import { makeStyles } from '@material-ui/styles';
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

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;
  const value = useContext(APIContext);
  const classes = useStyles();

  const [selectedLocation, setSelectedLocation] = useState([]);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [selectedType, setSelectedType] = useState([]);
  const [errType, setErrType] = useState(false);
  const [errTypeMessage, setErrTypeMessage] = useState('');

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="You can change your city at any time"
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
            {(value.vehicleType === "NA") ?
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
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
