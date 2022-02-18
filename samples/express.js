import express from "express";
import { build } from "../index.js";

const app = express();
const port = 3000;
let counter = 0;
const [reload, middleware] = build({
	endpoint: "/my-reload"
});

setInterval(() => {
	// eslint-disable-next-line no-console
	console.log("Reload!");
	reload();
}, 1000);

app.use(middleware);

app.get("/", (_req, res) => {
	res.send(template());
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Example app listening on port ${port}`);
});

function template() {
	return `
	<!DOCTYPE html>
	<html lang="en">
	  <head>
		<meta charset="utf-8">
		<title>Sample Page</title>
		<script src="/my-reload" type="module"></script>
		<meta name="viewport" content="width=device-width">
		<meta name="description" content="A test page">
	  </head>
	  <body>
		<h1>Welcome Visitor ${counter++}</h1>
	  </body>
	</html>
	`;
}
