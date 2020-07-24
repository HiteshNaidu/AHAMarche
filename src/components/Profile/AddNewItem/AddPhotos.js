import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Camera } from "./camera";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

export default function AddPhotos(props) {
    const classes = useStyles();
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add photos
            </Typography>
            <Fragment>
                {isCameraOpen && (
                    <>
                        <Camera
                            onCapture={blob => {setCardImage(blob); props.capturedImage(blob)}}
                            onClear={() => setCardImage(undefined)}
                        />
                        <br />
                    </>
                )}

                {cardImage && (
                    <></>
                    // <div>
                    //     <h2>Preview</h2>
                    //     <Preview src={cardImage && URL.createObjectURL(cardImage)} />
                    // </div>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => setIsCameraOpen(true)}>
                    Open Camera
                </Button>
            </Fragment>
        </React.Fragment>
    );
}