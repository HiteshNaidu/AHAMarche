import React from 'react';
import ReactDOM from 'react-dom';
import DeliveriesCompleted from './DeliveriesCompleted';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DeliveriesCompleted></DeliveriesCompleted>, div);
})