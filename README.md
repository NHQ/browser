# electron-starter

Clone this repo, and install electron if you haven't already.

```
npm install electron-prebuilt -g
```

To run the app, ```cd``` into this repo and
```
npm start
```

## notes

```app.js``` is the "main thread", ```entry.js``` is the "browser thread".  I found this distinction to be odd, but w/e.  It appears you can do everything you need to from the browser thread, plus you're in the window/DOM context.  But you must have both.  

Most examples I saw out there put the _app menu_ (at the OS level) logic in the browser thread.  I put in the main thread, saving on IPC calls.  

Noteworthy from this example is calling spawn and fs from the browser thread.  

```npm start``` copies entry.js as is to public/bundle.js, a vestige of browserify bundling :`^D


