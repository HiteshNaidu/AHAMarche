import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import IconButton from '@material-ui/core/IconButton';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        // color: "#fafafa",
        "&:disabled": {
            color: "#fafafa",
            background: "#fafafa",
        },
        "&:hover": {
            color: "#fafafa",
            background: "#fafafa",
        },
    }
}));

const onboardingSteps = [
    {
        label: 'A Marketplace For Everything',
        imgPath: '../imgs/marketplace.png',
        content:
            "Buy/Sell/Trade your possesions over a single platform. Or, earn by helping us deliver.",
    },
    {
        label: 'We Also Deliver',
        imgPath: '../imgs/shipping.png',
        content:
            "We offer delivery options to get the items you just bought/traded to your home.",
    },
];

export default function SwipeableTextMobileStepper() {
    const theme = useTheme();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = onboardingSteps.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = step => {
        setActiveStep(step);
    };

    return (
        <div >
            <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {onboardingSteps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 1 ? (
                            <>
                                <h2>{step.label}</h2>
                                <p>{step.content}</p>
                                <img style={{ paddingTop: "15px", paddingBottom: "15px" }} src={step.imgPath} alt={step.label} />
                            </>
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <IconButton className={classes.button} size="small" onClick={handleNext} disabled={true}>
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </IconButton >
                }
                backButton={
                    <IconButton className={classes.button} size="small" onClick={handleBack} disabled={true}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </IconButton >
                }
            />
        </div>
    );
}