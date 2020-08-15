import React from 'react';
import ReactDOM from 'react-dom';
import TotalEarnings from './TotalEarnings';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TotalEarnings></TotalEarnings>, div);
})