import React from 'react';
import ReactDOM from 'react-dom';
import { Camera } from './index';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Camera></Camera>, div);
})