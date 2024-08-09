const app = {
	name: process.env.APP_NAME,
	debug: process.env.APP_DEBUG === 'true',
	urls: {
		service: {
			signup: process.env.PLATFORM_SIGNUP_URL,
			token: process.env.PLATFORM_TOKEN_URL,
		}
	},
};
export default app;
