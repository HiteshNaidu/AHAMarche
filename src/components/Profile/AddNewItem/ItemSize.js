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

export default function ItemSize(props) {
    const classes = useStyles();

    const size = ['Small', 'Medium', 'Large', 'Extra Large'];

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
                defaultValue={size[0]}
                autoComplete
                id="tags-outlined"
                options={size}
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
                            label="Size"
                            fullWidth
                        />
                    </>
                )}
            />
        </>
    );
}