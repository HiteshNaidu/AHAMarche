import React/*, { useContext }*/ from "react";
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
        },
    };
});

export default function UpdateLocations(props) {
    const classes = useStyles();
    // const currentValue = useContext(APIContext);
    
    const vehicleType = [{ "type": "Hatchback" }, { "type": "Sedan" }, { "type": "SUV" }, { "type": "Truck" }];

    const handleChange = (event, values) => {
        props.setSelectedType(values);
        if (values) {
            if (values.length !== 0) {
                props.setErrType(false);
                props.setErrTypeMessage("");
            }
        }
    };

    return (
        <>
            <Autocomplete
                style={{ marginTop: "8px" }}
                classes={classes}
                // defaultValue={currentValue.locations}
                autoComplete
                id="tags-outlined"
                options={vehicleType}
                getOptionLabel={option => option.type}
                onChange={handleChange}
                renderInput={params => (
                    <>
                        <TextField
                            error={props.errType}
                            helperText={props.errTypeMessage}
                            required
                            {...params}
                            variant="outlined"
                            label="Vehicle Type"
                            fullWidth
                        />
                    </>
                )}
            />
        </>
    );
}