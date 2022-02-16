const config = {
	use: {
		baseURL: "http://localhost:3000",
		browserName: "firefox",
		headless: true
	},

	webServer: {
		command: "npm run sample:express",
		port: 3000
	}
};

export default config;
