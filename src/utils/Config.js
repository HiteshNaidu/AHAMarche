const dev = {
	api: {
		baseUrl: process.env.REACT_APP_API_URL,
		endpoints: {
			user: "user",
		},
	},
	cognito: {
		REGION: "ca-central-1",
		USER_POOL_ID: process.env.REACT_APP_COG_POOL,
		APP_CLIENT_ID: process.env.REACT_APP_CLIENT,
		AUTH_FLOWTYPE: "CUSTOM_AUTH",
	},
	/*S3: {
		BUCKET_NAME: "commercial-app-proc",
		REGION: "ca-central-1",
		MAX_FILE_SIZE: "5000", // MB
	},*/
};



// const config = process.env.REACT_APP_BUILD_ENV === "prod" ? prod : dev;
const config = dev;
export { config };