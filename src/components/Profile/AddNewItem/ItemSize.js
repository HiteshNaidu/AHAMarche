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

export default function ItemSize(props) {
    const classes = useStyles();

    const size = ['Small', 'Medium', 'Large', 'Extra Large'];

    const handleChange = (event, values) => {
        props.setSelectedSize(values);
        if (values) {
            props.setSelectedSize(values);
        } else {
            props.setSelectedSize(size[0]);
        }
    };

    useEffect(() => {
        props.setSelectedSize(size[0]);
        // eslint-disable-next-line
    }, []);

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