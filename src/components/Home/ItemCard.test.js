import React from 'react';
import ReactDOM from 'react-dom';
import ItemCard from './ItemCard';

it("renders without crashing", () => {
    const div = document.createElement("div");
    const card = {
        age: "1",
        description: "Good as new",
        id: "item-5040830022",
        itemSold: false,
        picturesLink: "https://www.ikea.com/ca/en/images/products/hemnes-chest-of-2-drawers-black-brown__0651104_PE706672_S5.JPG",
        price: "free",
        size: "Medium",
        sort: "Home",
        title: "Nightstand",
        user: "user-5dc75687-db86-4f0a-99ac-66cb4e5ccb5a"
    }
    ReactDOM.render(<ItemCard card={card}></ItemCard>, div);
})