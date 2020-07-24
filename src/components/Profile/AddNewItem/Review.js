import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Item summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText>Title</ListItemText>
                    <Typography variant="body2">Office chair</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText>Price</ListItemText>
                    <Typography variant="body2">$100</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText>Description</ListItemText>
                    <Typography variant="body2">Lorem ipsum dolor sit amet.</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText>Category</ListItemText>
                    <Typography variant="body2">Home</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText>Age</ListItemText>
                    <Typography variant="body2">1</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText>Size</ListItemText>
                    <Typography variant="body2">Medium</Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
}