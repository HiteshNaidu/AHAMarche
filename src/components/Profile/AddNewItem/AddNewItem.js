import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddPhotos from './AddPhotos';
import AddDetails from './AddDetails';
import Review from './Review';
import NavBar from "../../NavBar/NavBar";
import { AuthContext } from "../../../App";
import { postItem } from "../../../utils/Api";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Add photos', 'Add details', 'Review your item'];

function getStepContent(step, context) {
    switch (step) {
        case 0:
            return <AddPhotos capturedImage={context.capturedImage} />;
        case 1:
            return <AddDetails setSelectedTitle={context.setSelectedTitle} setSelectedPrice={context.setSelectedPrice} setSelectedDescription={context.setSelectedDescription} setSelectedCategory={context.setSelectedCategory} setSelectedAge={context.setSelectedAge} setSelectedSize={context.setSelectedSize} />;
        case 2:
            return <Review image={context.image} selectedTitle={context.selectedTitle} selectedPrice={context.selectedPrice} selectedDescription={context.selectedDescription} selectedCategory={context.selectedCategory} selectedAge={context.selectedAge} selectedSize={context.selectedSize} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [image, capturedImage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const currentUser = useContext(AuthContext);

    const context = {
        image,
        capturedImage,
        selectedCategory,
        setSelectedCategory,
        selectedAge,
        setSelectedAge,
        selectedSize,
        setSelectedSize,
        selectedTitle,
        setSelectedTitle,
        selectedPrice,
        setSelectedPrice,
        selectedDescription,
        setSelectedDescription,
    }

    const handleNext = () => {
        if (activeStep === 1) {
            // Error handling for details
        }
        if (activeStep === 2) {
            postItem(currentUser.user.attributes.sub, {
                "title": selectedTitle, "price": selectedPrice, "description": selectedDescription, "picturesLink": "Test",
                "category": selectedCategory, "age": selectedAge, "size": selectedSize, "status": "Active"
            }, currentUser.user.signInUserSession.idToken.jwtToken);
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <NavBar></NavBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Add New Item
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for uploading your item.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your item has been successfully uploaded to AHAMarché. You will recieve a text message with
                                    an option to connect with the interested parties.
                                </Typography>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep, context)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Upload Item' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}