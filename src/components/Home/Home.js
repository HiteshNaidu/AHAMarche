import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBar from '../NavBar/NavBar';
import CategoryFilter from './CategoryFilter';
import { APIContext, AuthContext } from "../../App";
import { getCurrentUser, getUserById } from "../../utils/Api";

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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const classes = useStyles();
  const currentUser = useContext(AuthContext);
  const value = useContext(APIContext);

  // Get current user upon initial load
  useEffect(() => {
    async function getUserFromAPI() {
      try {
        const user = await getCurrentUser();
        currentUser.setUser(user);

        let data = await getUserById(user.attributes.sub);
        if (data) {
          value.setUsername(data.data.phone);
          value.setCity(data.data.city);
          value.setCityItem(data.data.cityItem);
          value.setFirstname(data.data.firstname);
          value.setLastname(data.data.lastname);
          value.setIsDriver(data.data.isDriver);
          value.setDeliveriesCompleted(data.data.deliveriesCompleted);
          value.setVehicleType(data.data.vehicleType);
          value.setLinkToS3(data.data.linkToS3);
        }
      } catch (e) {
        console.log("Error getting current user: ", e);
      }
    }

    getUserFromAPI();
    // eslint-disable-next-line
  }, []);

  return (
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
                  <Button variant="contained" color="primary">
                    Change Category
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}