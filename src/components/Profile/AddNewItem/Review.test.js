import React from 'react';
import ReactDOM from 'react-dom';
import Review from './Review';

it("renders without crashing", () => {
    const div = document.createElement("div");
    const selectedTitle = "Item";
    const selectedPrice = "100";
    const selectedDescription = "Good";
    const selectedCategory = "Home";
    const selectedAge = "2";
    const selectedSize = "Small";
    ReactDOM.render(<Review
        selectedTitle={selectedTitle}
        selectedPrice={selectedPrice}
        selectedDescription={selectedDescription}
        selectedCategory={selectedCategory}
        selectedAge={selectedAge}
        selectedSize={selectedSize}></Review>, div);
})