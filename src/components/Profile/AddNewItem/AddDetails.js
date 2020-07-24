import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CategoryFilter from '../../Home/CategoryFilter';
import ItemAge from './ItemAge';
import ItemSize from './ItemSize';

export default function AddDetails(props) {
    const handleChange = (event) => {
        if (event.target.id === 'title') {
            props.setSelectedTitle(event.target.value);
        }
        if (event.target.id === 'price') {
            props.setSelectedPrice(event.target.value);
        }
        if (event.target.id === 'description') {
            props.setSelectedDescription(event.target.value);
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add Item Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        autoFocus
                        autoComplete="title"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="price"
                        name="price"
                        label="Price"
                        fullWidth
                        autoComplete="price"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Description"
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