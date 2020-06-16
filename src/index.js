import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from "aws-amplify";
import { config } from "./utils/Config";

Amplify.configure({
	Auth: {
		mandatorySignIn: false,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID,
		authenticationFlowType: config.cognito.AUTH_FLOWTYPE,

	},
	/*Storage: {
		AWSS3: {
			bucket: config.S3.BUCKET_NAME,
			region: config.S3.REGION,
		},
	},*/
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();