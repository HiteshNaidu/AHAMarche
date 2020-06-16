import React from "react";
import { Switch, Route } from "react-router-dom";

import Homepage from "../Home/Home";
import Profile from "../Profile/Profile"
import { NotFound } from "./NotFound";

import SignIn from "../Auth/SignIn";
import CustomerSignUp from "../Auth/CustomerSignUp";
import DrivererSignUp from "../Auth/DriverSignUp";
import SubmitCode from "../Auth/SubmitCode";

import Welcome from "../WelcomeScreen/Welcome";

import AuthenticatedRoute from "./AuthenticatedRoutes";
import UnauthenticatedRoute from "./UnauthenticatedRoutes";

import PrivacyPolicy from "../Privacy/PrivacyDetails";

export function Routes({ appProps }) {
    return (
        <Switch>
            <UnauthenticatedRoute path="/" exact component={Welcome} appProps={appProps} />
            <UnauthenticatedRoute path="/customersignup" exact component={CustomerSignUp} appProps={appProps} />
            <UnauthenticatedRoute path="/driversignup" exact component={DrivererSignUp} appProps={appProps} />
            <UnauthenticatedRoute path="/signin" exact component={SignIn} appProps={appProps} />
            <UnauthenticatedRoute path="/submitcode" exact component={SubmitCode} appProps={appProps} />
            <UnauthenticatedRoute path="/privacy" exact component={PrivacyPolicy} appProps={appProps} />
            <AuthenticatedRoute path="/home" exact component={Homepage} appProps={appProps} />
            <AuthenticatedRoute path="/profile" exact component={Profile} appProps={appProps} />
            <Route exact component={NotFound} />
        </Switch>
    );
}