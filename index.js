import { EventEmitter } from "events";

export function build({ endpoint = "/reload" } = {}) {
	const eventEmitter = new EventEmitter();
	const reload = () => eventEmitter.emit("reload");

	function middleware({ headers, url }, res, next) {
		if(url === endpoint) {
			if(headers.accept === "text/event-stream") {
				res.writeHead(200, {
					"Content-Type": "text/event-stream",
					"Cache-Control": "no-cache",
					Connection: "keep-alive"
				});
				res.write("\n");

				eventEmitter.on("reload", () => {
					res.write("event: reload\n");
					res.write("data: reload\n\n");
				});

				// keep alive
				setInterval(() => {
					res.write("event: ping\n");
					res.write("data: ping\n\n");
				}, 1000);
			} else {
				res.setHeader("Content-type", "application/javascript");
				res.end(script());
			}

			return;
		}

		next();
	}

	return [reload, middleware];
}

function script() {
	return `
	let eventSource = new EventSource("/reload");
	eventSource.addEventListener("reload", () => {
	  eventSource.close();
	  location.reload();
	});
  `;
}
