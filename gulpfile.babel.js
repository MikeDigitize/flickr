import "babel-core/register";
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minimise from "gulp-cssnano";
import concat from "gulp-concat";

import webpack from "webpack-stream";
import { Server } from "karma";

var bs4Source = "./src/scss/bootstrap-custom.scss";
var sassSource = "./src/scss/app.scss";
var stylesDest = "./build/css";
var jsSource = "./src/js/app.js";
var jsDest = "./build/js";
var htmlSource = "./src/*.html";
var htmlDest = "./build";

gulp.task("js", () => {
    return gulp.src(jsSource)
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest(jsDest));
});

gulp.task("styles", () => {
    return gulp.src([bs4Source, sassSource])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minimise())
        .pipe(concat("flickr-app-styles.min.css"))
        .pipe(gulp.dest(stylesDest));
});

gulp.task("html", () => {
    return gulp.src(htmlSource)
        .pipe(gulp.dest(htmlDest));
});

gulp.task("karma", done => {
    new Server({
        configFile: __dirname + "/src/tests/karma.config.js",
        singleRun: true,
        autoWatch: false,
        browsers: ["PhantomJS"]
    }, karmaExitStatus => {
        done();
        if (karmaExitStatus) {
            process.exit(1);
        }
    }).start();
});

gulp.task("watch", function() {
    gulp.watch(bs4Source, ["styles"]);
    gulp.watch(htmlSource, ["html"]);
    gulp.watch(jsSource, ["js"]);
});

gulp.task("default", ["html", "styles", "js", "watch"]);