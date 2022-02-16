# browser-b-gone

[![npm](https://img.shields.io/npm/v/browser-b-gone.svg)](https://www.npmjs.com/package/browser-b-gone)

A connect middleware to reload the browser from the server.

![TV-B-Gone is a remote to turn off any TV](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/TV-B-Gone_complete.jpg/440px-TV-B-Gone_complete.jpg)

## Usage with Express

First, import the build function from browser-b-gone and call it:

```js
import { build } from "browser-b-gone";

const [reload, middleware] = build();
```

You will get back two functions:
* `reload` is a function you can call to reload the page in all connected browsers.
* `middleware` is the Express middleware you need to `use`

Now, use the middleware:

```js
app.use(middleware);
```

We do not inject anything into your HTML. You need to do that yourself.
You need to load the JavaScript file `/reload` in your code (in development):

```js
<script src="/reload" type="module"></script>
```

Now, whenever you call the `reload()` function in your backend, the browsers
will reload.

## Comparison to other solutions

* It has no dependencies and is very lightweight.
* It is easy to understand.
* It does not inject anything into your HTML.
* You can hook it into your code to reload on your behalf, sharing the watch
    process to be easy on your resources.

## License

browser-b-gone is licensed under the Apache 2.0 License.
