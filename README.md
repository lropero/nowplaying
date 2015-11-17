# nowplaying

The NowPlaying page is a simple one-page app where visitors can visualize the most recent videos being shared on Twitter by people nearby.

### Author(s)

Luciano Ropero: <lropero@gmail.com>

### Installation

First off, you need [Node.js](https://nodejs.org/) installed on your computer. Then execute:

```sh
$ npm install
$ npm start
```

> Note that npm consumes package.json so make sure you are standing at the root of the project folder where this file resides.

Once the HTTP server is listening, access: [http://localhost:8000/](http://localhost:8000/)

### CSS & JS dependencies

In order to recompile ./css/styles.css and ./js/dependencies.js, you need to have Gulp installed globally:

```sh
$ npm install -g gulp
```

Then run:

```sh
$ gulp
```

> Note that Gulp consumes gulpfile.js so make sure you are standing at the root of the project folder where this file resides.

This will:

* Compile all *.scss files located at ./sass
* Concatenate all CSS files into a single styles.css file
* Minify styles.css and place it under ./css
* Concatenate JS dependencies into a single dependencies.js file
* Uglify modernizr.js and dependencies.js and place them under ./js/vendor
* Delete ./tmp folder used to run Gulp tasks
