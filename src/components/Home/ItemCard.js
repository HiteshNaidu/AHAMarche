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
import { getUserById, textToSeller } from "../../utils/Api";

const useStyles = makeStyles((theme) => ({
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

    async function handleSeller() {
        const userId = prop.card.user.split("-")[1] + "-" + prop.card.user.split("-")[2] + "-" + prop.card.user.split("-")[3] + "-" + prop.card.user.split("-")[4] + "-" + prop.card.user.split("-")[5];
        let data = await getUserById(userId, currentUser.user.signInUserSession.idToken.jwtToken);
        // console.log((data.data.firstname + " " + data.data.lastname), data.data.phone, (value.firstname + " " + value.lastname), value.username, prop.card.title);
        await textToSeller(data.data.phone, { "userName": (value.firstname + " " + value.lastname), "phone": value.username, "item": prop.card.title, "sellerName": (data.data.firstname + " " + data.data.lastname) });
    }

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
                                image="../imgs/smartphone.png"
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
                                    Contact Seller
                                </Button>
                                <Button size="small" color="primary" variant="contained">
                                    Get Item Delivered
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </Modal>
                :
                <></>
        );
    }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image="../imgs/smartphone.png"
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
    );
}