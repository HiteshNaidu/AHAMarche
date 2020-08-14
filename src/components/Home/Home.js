import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from '../NavBar/NavBar';
import CategoryFilter from './CategoryFilter';
import { APIContext, AuthContext } from "../../App";
import { getCurrentUser, getUserById, getItemsByCategory, postUserById } from "../../utils/Api";
import ItemCard from "./ItemCard";
import Dashboard from "../Dashboard/Dashboard";
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Home() {
  const classes = useStyles();
  const currentUser = useContext(AuthContext);
  const value = useContext(APIContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [openFailAlert, setOpenFailAlert] = useState(false);
  const [message, setMessage] = useState("");

  // Get current user upon initial load
  useEffect(() => {
    async function getUserFromAPI() {
      try {
        const user = await getCurrentUser();
        currentUser.setUser(user);

        navigator.geolocation.getCurrentPosition(
          async function (position) {
            await postUserById(user.attributes.sub, { "realLocation": { "latitude": position.coords.latitude, "longitude": position.coords.longitude } });
          },
          function (error) {
            setMessage("You location is not accessible! Please allow AHAMarché to access your location.");
            setOpenFailAlert(true);
          }
        )

        let data = await getUserById(user.attributes.sub, user.signInUserSession.idToken.jwtToken);
        if (data) {
          value.setUsername(data.data.phone);
          value.setCity(data.data.city);
          value.setCityItem(data.data.cityItem);
          value.setFirstname(data.data.firstname);
          value.setLastname(data.data.lastname);
          value.setIsDriver(data.data.isDriver);
          value.setIsDriverActive(data.data.isDriverActive);
          value.setDeliveriesCompleted(data.data.deliveriesCompleted);
          value.setVehicleType(data.data.vehicleType);
          value.setLinkToS3(data.data.linkToS3);
          value.setRealLocation(data.data.realLocation);
        }
        let items = await getItemsByCategory(value.selectedCategory, user.signInUserSession.idToken.jwtToken);
        if (items.data) {
          var arr = [];
          for (let i = 0; i < items.data.length; i++) {
            if (items.data[i].itemSold === false) {
              arr.push(items.data[i]);
            }
          }
          value.setItemList(arr);
        }
        setIsLoaded(true);
      } catch (e) {
        console.log("Error getting current user: ", e);
      }
    }

    getUserFromAPI();
    // eslint-disable-next-line
  }, []);

  async function handleCategoryChange() {
    let items = await getItemsByCategory(value.selectedCategory, currentUser.user.signInUserSession.idToken.jwtToken);
    if (items.data) {
      var arr = [];
      for (let i = 0; i < items.data.length; i++) {
        if (items.data[i].itemSold === false) {
          arr.push(items.data[i]);
        }
      }
      value.setItemList(arr);
    }
    // value.setItemList(items.data);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailAlert(false);
  };

  return (
    (isLoaded) ?
      <>
        {(value.isDriverActive) ?
          <Dashboard></Dashboard>
          :
          <React.Fragment>
            <CssBaseline />
            <NavBar></NavBar>
            <main>
              <div className={classes.heroContent}>
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Your Personal Marketplace
                  </Typography>
                  <Typography variant="h6" align="center" color="textSecondary" paragraph>
                    Please select the category you want to explore
                  </Typography>
                  <CategoryFilter setSelectedCategory={value.setSelectedCategory}></CategoryFilter>
                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <Button variant="contained" color="primary" onClick={handleCategoryChange}>
                          Change Category
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </div>
              <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                  {value.itemList.map((card, idx) => (
                    <Grid item key={idx} xs={12} sm={6} md={4}>
                      <ItemCard card={card} idx={idx}></ItemCard>
                    </Grid>
                  ))}
                </Grid>
                <Snackbar open={openFailAlert} autoHideDuration={5000} onClose={handleClose}>
                  <Alert style={{ textAlign: "left" }} severity="error" onClose={handleClose}>
                    {message}
                  </Alert>
                </Snackbar>
              </Container>
            </main>
          </React.Fragment>}
      </>
      :
      <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <CircularProgress />
        <br />
        <h3>Loading</h3>
      </>
  );
}