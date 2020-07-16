const dev = {
	api: {
		baseUrl: process.env.REACT_APP_API_URL,
		endpoints: {
			user: "user",
			category: "category",
		},
	},
	cognito: {
		REGION: "ca-central-1",
		USER_POOL_ID: process.env.REACT_APP_COG_POOL,
		APP_CLIENT_ID: process.env.REACT_APP_CLIENT,
		AUTH_FLOWTYPE: "CUSTOM_AUTH",
	},
};

// const config = process.env.REACT_APP_BUILD_ENV === "prod" ? prod : dev;
const config = dev;
export { config };