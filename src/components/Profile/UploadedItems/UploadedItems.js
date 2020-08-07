import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import { useHistory } from "react-router-dom";

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
}));

const LatestProducts = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  let history = useHistory();

  const [products] = useState(mockData);

  const handleClick = () => {
    history.push("/addnewitem");
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Uploaded Items"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {products.map((product, i) => (
            <ListItem
              divider={i < products.length - 1}
              key={product.id}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`Uploaded ${product.uploadedAt.fromNow()}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          Add New Item
        </Button>
      </CardActions>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
