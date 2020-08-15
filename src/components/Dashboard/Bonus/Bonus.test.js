import React from 'react';
import ReactDOM from 'react-dom';
import Bonus from './Bonus';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Bonus></Bonus>, div);
})