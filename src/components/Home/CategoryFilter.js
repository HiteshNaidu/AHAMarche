import React, { useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { APIContext } from "../../App";
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

export default function CategoryFilter(props) {
    const classes = useStyles();
    const currentValue = useContext(APIContext);

    const category = ['Home', 'Clothing', 'Electronics', 'Automotive', 'Books', 'Tools', 'Beauty', 'Health', 'Sports', 'Toy'];

    const handleChange = (event, values) => {
        props.setSelectedCategory(values);
        if (values) {
            props.setSelectedCategory(values);
        } else {
            props.setSelectedCategory(category[0]);
        }
    };

    useEffect(() => {
        props.setSelectedCategory(category[0]);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Autocomplete
                classes={classes}
                defaultValue={currentValue.selectedCategory}
                autoComplete
                id="tags-outlined"
                options={category}
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
                            label="Category"
                            fullWidth
                        />
                    </>
                )}
            />
        </>
    );
}