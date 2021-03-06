import React, { Fragment, useState } from 'react';
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
            <Fragment>
                {isCameraOpen && (
                    <>
                        <Camera
                            onCapture={blob => { setCardImage(blob); props.capturedImage(blob); }}
                            onClear={() => setCardImage(undefined)}
                        />
                        <br />
                    </>
                )}

                {cardImage && (<></>)}

                {(!isCameraOpen) ?
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => setIsCameraOpen(true)}>
                        Upload Item Picture
                    </Button> :
                    <></>}
            </Fragment>
        </React.Fragment>
    );
}