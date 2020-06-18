import React/*, { useContext }*/ from "react";
import { cityData } from "./LatLon";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import { APIContext } from "../App";
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

export default function UpdateLocations(props) {
    const classes = useStyles();
    // const currentValue = useContext(APIContext);

    const handleChange = (event, values) => {
        props.setSelectedLocation(values);
        if (values) {
            if (values.length !== 0) {
                props.setErr(false);
                props.setErrMessage("");
            }
        }
    };

    return (
        <>
            <Autocomplete
                classes={classes}
                // defaultValue={currentValue.locations}
                autoComplete
                id="tags-outlined"
                options={cityData}
                getOptionLabel={option => option.name_e}
                onChange={handleChange}
                renderInput={params => (
                    <>
                        <TextField
                            error={props.err}
                            helperText={props.errMessage}
                            required
                            {...params}
                            variant="outlined"
                            label="City"
                            fullWidth
                        />
                    </>
                )}
            />
        </>
    );
}