import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        inputRoot: {
            "& .MuiAutocomplete-endAdornment": {
                top: "14px"
            }
        }
    };
});

export default function ItemAge(props) {
    const classes = useStyles();

    const age = ['New', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'More than 10'];

    const handleChange = (event, values) => {
        props.setSelectedAge(values);
        if (values) {
            props.setSelectedAge(values);
        } else {
            props.setSelectedAge(age[0]);
        }
    };

    useEffect(() => {
        props.setSelectedAge(age[0]);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Autocomplete
                classes={classes}
                defaultValue={age[0]}
                autoComplete
                id="tags-outlined"
                options={age}
                getOptionLabel={option => option}
                onChange={handleChange}
                renderInput={params => (
                    <>
                        <TextField
                            required
                            {...params}
                            variant="outlined"
                            label="Age"
                            fullWidth
                        />
                    </>
                )}
            />
        </>
    );
}