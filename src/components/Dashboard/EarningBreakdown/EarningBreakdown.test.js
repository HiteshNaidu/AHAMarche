import React from 'react';
import ReactDOM from 'react-dom';
import EarningBreakdown from './EarningBreakdown';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<EarningBreakdown></EarningBreakdown>, div);
})