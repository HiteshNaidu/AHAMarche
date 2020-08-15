import React from 'react';
import ReactDOM from 'react-dom';
import CompletedDeliveriesList from './CompletedDeliveriesList';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CompletedDeliveriesList></CompletedDeliveriesList>, div);
})