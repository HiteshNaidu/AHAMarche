import React from "react";
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
        props.setSelectedCategory(values);
        if (values) {
            props.setSelectedCategory(values);
        } else {
            props.setSelectedCategory('Home');
        }
    };

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
                            error={props.err}
                            helperText={props.errMessage}
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