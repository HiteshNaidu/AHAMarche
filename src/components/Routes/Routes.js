import React from "react";
import { Switch, Route } from "react-router-dom";

import Homepage from "../Home/Home";
import Profile from "../Profile/Profile"
import { NotFound } from "./NotFound";

import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import DrivererSignUp from "../Auth/DriverSignUp";
import SubmitCode from "../Auth/SubmitCode";
import Dashboard from "../Dashboard/Dashboard"

import Welcome from "../WelcomeScreen/Welcome";

import AuthenticatedRoute from "./AuthenticatedRoutes";
import UnauthenticatedRoute from "./UnauthenticatedRoutes";

import PrivacyPolicy from "../Privacy/PrivacyDetails";

export function Routes({ appProps }) {
    return (
        <Switch>
            <UnauthenticatedRoute path="/" exact component={Welcome} appProps={appProps} />
            <UnauthenticatedRoute path="/signup" exact component={SignUp} appProps={appProps} />
            <UnauthenticatedRoute path="/signin" exact component={SignIn} appProps={appProps} />
            <UnauthenticatedRoute path="/submitcode" exact component={SubmitCode} appProps={appProps} />
            <UnauthenticatedRoute path="/privacy" exact component={PrivacyPolicy} appProps={appProps} />
            <AuthenticatedRoute path="/home" exact component={Homepage} appProps={appProps} />
            <AuthenticatedRoute path="/profile" exact component={Profile} appProps={appProps} />
            <AuthenticatedRoute path="/driversignup" exact component={DrivererSignUp} appProps={appProps} />
            <AuthenticatedRoute path="/dashboard" exact component={Dashboard} appProps={appProps} />
            <Route exact component={NotFound} />
        </Switch>
    );
}