import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CategoryFilter from '../../Home/CategoryFilter';
import ItemAge from './ItemAge';
import ItemSize from './ItemSize';

export default function AddDetails(props) {
    const handleChange = (event) => {
        if (event.target.id === 'title') {
            props.setTitleHelperText('');
            props.setTitleError(false);
            props.setSelectedTitle(event.target.value);
        }
        if (event.target.id === 'price') {
            props.setPriceHelperText('');
            props.setPriceError(false);
            props.setSelectedPrice(event.target.value);
        }
        if (event.target.id === 'description') {
            props.setDescriptionHelperText('');
            props.setDescriptionError(false);
            props.setSelectedDescription(event.target.value);
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={props.selectedTitle}
                        required
                        id="title"
                        name="title"
                        label="Title"
                        helperText={props.titleHelperText}
                        error={props.titleError}
                        fullWidth
                        autoFocus
                        autoComplete="title"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        defaultValue={props.selectedPrice}
                        required
                        id="price"
                        name="price"
                        label="Price"
                        helperText={props.priceHelperText}
                        error={props.priceError}
                        fullWidth
                        autoComplete="price"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        defaultValue={props.selectedDescription}
                        required
                        id="description"
                        name="description"
                        label="Description"
                        helperText={props.descriptionHelperText}
                        error={props.descriptionError}
                        fullWidth
                        autoComplete="description"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CategoryFilter setSelectedCategory={props.setSelectedCategory}></CategoryFilter>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemAge setSelectedAge={props.setSelectedAge}></ItemAge>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemSize setSelectedSize={props.setSelectedSize}></ItemSize>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}