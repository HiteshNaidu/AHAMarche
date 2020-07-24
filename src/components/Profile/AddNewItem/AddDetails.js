import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CategoryFilter from '../../Home/CategoryFilter';
import ItemAge from './ItemAge';
import ItemSize from './ItemSize';

export default function AddDetails() {
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
                        autoComplete="title"
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
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CategoryFilter></CategoryFilter>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemAge></ItemAge>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemSize></ItemSize>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}