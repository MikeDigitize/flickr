# Flickr

A simple Flickr image app built with React and Redux.

### Uses

Node: v4.4.5

Build: Gulp, Webpack, Babel 6

Tests: Karma, Mocha, Chai, React addons test utils

CSS : Bootstrap 4 light custom build

### To run

Open index.html from build folder to view

### To build in development mode

Run npm start and view on localhost:1337 which will build in development (non minified JS) mode, watch for changes to the src directory and run karma with Phantom JS watching for changes to the tests folder

### To build in production mode

Run gulp build:production to build HTML, CSS and JavaScript using Webpack in production mode. Reduces app.js from nearly 800kb to 167kb.

### To test

Run npm test to test in Chrome, Firefox, IE10 and IE9 (haven't upgraded my IE10 yet because it has more accurate IE9 emulation than IE11 and above!)


### Notes

The app is fully responsive and works fine on IE9+ and the mobile devices I tested it on (admittedly just on Safari and Android Chrome)

##### Challenges

There was a bug in the initial code snippet. The snippet was wrapped in an IIFE so the callback to the FLickr API in the query string would not be accessible when the script is appended to the document head.

The images come back all shapes and sizes from the Flickr API so I did some extra work whilst loading them into cache before displaying to grab the dimensions so I could position them in some kind of semi-uniform way.

Any clicked upon images are favourited - indicated by the dashed line around the image holder. This then saves the image in localstorage. When the app loads localstorage is checked and all the images favourited are compared against the ones returned from the Flickr API. Any that exist in both are filtered out from the saved favourited array and the remainding are appended to the image array sent from Flickr so as not to show the same image twice.

I would have liked to have built a more comprehensive test suite but I had spent 10+ hours on the task so decided to stick with the stateless components and key utility functions.




