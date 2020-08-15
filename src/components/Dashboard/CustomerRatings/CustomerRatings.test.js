import React from 'react';
import ReactDOM from 'react-dom';
import CustomerRatings from './CustomerRatings';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CustomerRatings></CustomerRatings>, div);
})