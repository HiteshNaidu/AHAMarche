import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { APIContext, AuthContext } from "../../App";
import { getUserById, textToSeller, getAllUsers, textToDriver, updateItemById } from "../../utils/Api";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Box from '@material-ui/core/Box';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        margin: theme.spacing(10, 10, 10, 10)
    },
    cardContent: {
        flexGrow: 1,
    },
    cardButton: {
        "&:hover": {
            background: "white"
        },
        "&:disabled": {
            color: '#3f51b5'
        }
    },
    paperModal: {
        position: 'absolute',
        // width: 360,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1, 1),
    },
}));

export default function ItemCard(prop) {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);
    const value = useContext(APIContext);

    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openFailAlert, setOpenFailAlert] = useState(false);
    const [message, setMessage] = useState(false);

    var driverArr = [];

    function getModalStyle() {
        const top = 5;
        const bottom = 15;
        const left = 5;
        const right = 5;

        return {
            top: `${top}%`,
            bottom: `${bottom}%`,
            left: `${left}%`,
            right: `${right}%`,
            transform: `translate(-${top}%, -${left}% -${bottom}% -${right}%)`,
        };
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
        setOpenFailAlert(false);
    };

    async function handleSeller() {
        try {
            if (prop.card.itemSold === false) {
                const userId = prop.card.user.split("-")[1] + "-" + prop.card.user.split("-")[2] + "-" + prop.card.user.split("-")[3] + "-" + prop.card.user.split("-")[4] + "-" + prop.card.user.split("-")[5];
                let data = await getUserById(userId, currentUser.user.signInUserSession.idToken.jwtToken);
                await updateItemById(prop.card.id, { "itemSold": true, "category": prop.card.sort }, currentUser.user.signInUserSession.idToken.jwtToken);
                prop.card.itemSold = true;
                await textToSeller(data.data.phone, {
                    "userName": (value.firstname + " " + value.lastname),
                    "phone": value.username, "item": prop.card.title, "sellerName": (data.data.firstname + " " + data.data.lastname)
                }, currentUser.user.signInUserSession.idToken.jwtToken);
                setMessage("A text message has been sent to the seller. You will be contacted by them for further dicussion.");
                setOpenAlert(true);
            } else {
                setMessage("An error occured: Item is sold.");
                setOpenFailAlert(true);
            }
        } catch (e) {
            setMessage("An error occured: Failed to send a text message to the seller. Please try again after sometime.");
            setOpenFailAlert(true);
        }
    }

    async function handleDelivery() {
        try {
            if (prop.card.itemSold === false) {
                var price = "0";
                const userId = prop.card.user.split("-")[1] + "-" + prop.card.user.split("-")[2] + "-" + prop.card.user.split("-")[3] + "-" + prop.card.user.split("-")[4] + "-" + prop.card.user.split("-")[5];
                let seller = await getUserById(userId, currentUser.user.signInUserSession.idToken.jwtToken);
                let drivers = await getAllUsers(currentUser.user.signInUserSession.idToken.jwtToken);
                switch (prop.card.size) {
                    case 'Small':
                        price = "3.99";
                        for (let i = 0; i < drivers.data.length; i++) {
                            if (seller.data.city === drivers.data[i].city && drivers.data[i].isDriver === true && drivers.data[i].isDriverActive === true) {
                                if (drivers.data[i].vehicleType === "Hatchback" || drivers.data[i].vehicleType === "Sedan" || drivers.data[i].vehicleType === "SUV" || drivers.data[i].vehicleType === "Truck") {
                                    driverArr.push(drivers.data[i]);
                                }
                            }
                        }
                        break;
                    case 'Medium':
                        price = "5.99";
                        for (let i = 0; i < drivers.data.length; i++) {
                            if (seller.data.city === drivers.data[i].city && drivers.data[i].isDriver === true && drivers.data[i].isDriverActive === true) {
                                if (drivers.data[i].vehicleType === "Hatchback" || drivers.data[i].vehicleType === "Sedan" || drivers.data[i].vehicleType === "SUV" || drivers.data[i].vehicleType === "Truck") {
                                    driverArr.push(drivers.data[i]);
                                }
                            }
                        }
                        break;
                    case 'Large':
                        price = "7.99";
                        for (let i = 0; i < drivers.data.length; i++) {
                            if (seller.data.city === drivers.data[i].city && drivers.data[i].isDriver === true && drivers.data[i].isDriverActive === true) {
                                if (drivers.data[i].vehicleType === "SUV" || drivers.data[i].vehicleType === "Truck") {
                                    driverArr.push(drivers.data[i]);
                                }
                            }
                        }
                        break;
                    case 'Extra Large':
                        price = "9.99";
                        for (let i = 0; i < drivers.data.length; i++) {
                            if (seller.data.city === drivers.data[i].city && drivers.data[i].isDriver === true && drivers.data[i].isDriverActive === true) {
                                if (drivers.data[i].vehicleType === "Truck") {
                                    driverArr.push(drivers.data[i]);
                                }
                            }
                        }
                        break;
                    default:
                        console.log("Error: Item size unknown!");
                }

                const random = Math.floor(Math.random() * driverArr.length);
                await updateItemById(prop.card.id, { "itemSold": true, "category": prop.card.sort }, currentUser.user.signInUserSession.idToken.jwtToken);
                prop.card.itemSold = true;
                // text to driver here
                await textToDriver(driverArr[random].phone, {
                    "city": seller.data.city, "item": prop.card.title, "sellerName": (seller.data.firstname + " " + seller.data.lastname),
                    "sellerPhone": (seller.data.phone), "buyerPhone": value.username, "buyerName": (value.firstname + " " + value.lastname), "price": price
                }, currentUser.user.signInUserSession.idToken.jwtToken);
                setMessage("A text message has been sent to the driver. You will be contacted by them for further dicussion.");
                setOpenAlert(true);
            } else {
                setMessage("An error occured: Item is sold.");
                setOpenFailAlert(true);
            }
        } catch (e) {
            setMessage("An error occured: Failed to assign and send text message to the driver. Please try again after sometime.");
            setOpenFailAlert(true);
        }
    };

    function ItemModal(prop) {
        // getModalStyle is not a pure function, we roll the style only on the first render
        const [modalStyle] = useState(getModalStyle);

        return (
            (open) ?
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paperModal}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={prop.card.picturesLink}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {prop.card.title}
                                </Typography>
                                <Typography>
                                    {prop.card.description}
                                </Typography>
                                <br />
                                <Typography variant="button" component="h2">
                                    {"Age(years): " + prop.card.age}
                                </Typography>
                                <Typography variant="button" component="h2">
                                    {"Price: " + prop.card.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {/* <Button size="small" color="primary" variant="outlined" onClick={handleSeller(prop.card.user.split("-")[1] + "-" + prop.card.user.split("-")[2] + "-" + prop.card.user.split("-")[3] + "-" + prop.card.user.split("-")[4] + "-" + prop.card.user.split("-")[5])}> */}
                                <Button size="small" color="primary" variant="outlined" onClick={handleSeller}>
                                    Pick-Up Item
                                </Button>
                                <Button size="small" color="primary" variant="contained" onClick={handleDelivery}>
                                    Get Item Delivered
                                </Button>
                            </CardActions>
                        </Card>
                        <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
                            <Alert style={{ backgroundColor: "#66bb6a", textAlign: "left" }} onClose={handleCloseAlert}>
                                {message}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openFailAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
                            <Alert style={{ textAlign: "left" }} severity="error" onClose={handleCloseAlert}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </div>
                </Modal>
                :
                <></>
        );
    }

    return (
        (prop.card.price === "free") ?
            <>
                <Box border={5} borderColor="green">
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={prop.card.picturesLink}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {prop.card.title}
                            </Typography>
                            <Typography>
                                {prop.card.description}
                            </Typography>
                            <ItemModal card={prop.card}></ItemModal>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" variant="contained" onClick={handleOpen}>
                                View
                            </Button>
                            <Button className={classes.cardButton} size="large" color="primary" disableFocusRipple disableRipple disableTouchRipple disabled>
                                {"Price: " + prop.card.price}
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </>
            :
            <>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={prop.card.picturesLink}
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {prop.card.title}
                        </Typography>
                        <Typography>
                            {prop.card.description}
                        </Typography>
                        <ItemModal card={prop.card}></ItemModal>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained" onClick={handleOpen}>
                            View
                    </Button>
                        <Button className={classes.cardButton} size="large" color="primary" disableFocusRipple disableRipple disableTouchRipple disabled>
                            {"Price: " + prop.card.price}
                        </Button>
                    </CardActions>
                </Card>
            </>
    );
}