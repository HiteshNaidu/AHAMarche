import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeStepper from './WelcomeStepper';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WelcomeStepper></WelcomeStepper>, div);
})