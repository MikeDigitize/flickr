import "babel-core/register";
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minimise from "gulp-cssnano";
import concat from "gulp-concat";

import webpack from "webpack-stream";
import { Server } from "karma";

let bootstrap4Source = "./src/scss/bootstrap-custom.scss";
let sassSource = "./src/scss/app.scss";
let stylesDest = "./build/css";
let outputtedCSSFileName = "flickr-app-styles.min.css";

let jsSource = "./src/js/app.js";
let jsDest = "./build/js";
let webpackConfigSrc = "./webpack.config.js";

let htmlSource = "./src/*.html";
let htmlDest = "./build";

let testConfigSrc = __dirname + "/src/tests/karma.config.js";
let testSource = "./src/tests/**/*.js";

let karmaServer = (configSrc, browsers, done) => new Server({
        configFile: configSrc,
        singleRun: true,
        autoWatch: false,
        browsers: browsers
    }, karmaExitStatus => {
        done();
        if (karmaExitStatus) {
            process.exit(1);
        }
    }).start();

gulp.task("js", () => {
    return gulp.src(jsSource)
        .pipe(webpack(require(webpackConfigSrc)))
        .pipe(gulp.dest(jsDest));
});

gulp.task("styles", () => {
    return gulp.src([bootstrap4Source, sassSource])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minimise())
        .pipe(concat(outputtedCSSFileName))
        .pipe(gulp.dest(stylesDest));
});

gulp.task("html", () => {
    return gulp.src(htmlSource)
        .pipe(gulp.dest(htmlDest));
});

gulp.task("html", () => {
    return gulp.src(htmlSource)
        .pipe(gulp.dest(htmlDest));
});

gulp.task("karma", done => {
    return karmaServer(testConfigSrc, ["PhantomJS"], done);
});

gulp.task("karma:browser-tests", done => {
    return karmaServer(testConfigSrc, ["PhantomJS", "Chrome", "Firefox", "IE10", "IE9"], done);
});

gulp.task("watch", function() {
    gulp.watch([bootstrap4Source, sassSource], ["styles"]);
    gulp.watch(htmlSource, ["html"]);
    gulp.watch(jsSource, ["js"]);
    gulp.watch(testSource, ["karma"]);
});

gulp.task("default", ["html", "styles", "js", "karma", "watch"]);