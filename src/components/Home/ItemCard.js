import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
        // padding: theme.spacing(2, 4, 3),
    },
}));

export default function ItemCard(prop) {
    const classes = useStyles();

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
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {prop.card.title}
                                </Typography>
                                <Typography>
                                    {prop.card.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button className={classes.cardButton} size="large" color="primary" disableFocusRipple disableRipple disableTouchRipple disabled>
                                    {prop.card.price}
                                </Button>
                                <Button size="small" color="primary" variant="outlined">
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
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {prop.card.title}
                </Typography>
                <ItemModal card={prop.card}></ItemModal>
            </CardContent>
            <CardActions>
                <Button className={classes.cardButton} size="large" color="primary" disableFocusRipple disableRipple disableTouchRipple disabled>
                    {prop.card.price}
                </Button>
                <Button size="small" color="primary" variant="contained" onClick={handleOpen}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}