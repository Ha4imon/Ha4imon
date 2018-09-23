var gulp = require("gulp");
var server = require("browser-sync");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var del = require("del");


gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({
      stream: true
    }));
});


gulp.task("normalize", function() {
  gulp.src("source/css/normalize.css")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("normalize.min.css"))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({
      stream: true
    }));
});


gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest("build/img"));
});


gulp.task("symbols", function() {
  return gulp.src("source/img/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img/svg"));
});


gulp.task("serve", ["style"], function() {
  server.init({
    server: "source"
  });
  gulp.watch("source/sass/**/*.scss", ["style"]);
  gulp.watch("source/css/normalize.css", ["normalize"]);
  gulp.watch("source/*.html")
    .on("change", server.reload);

});


gulp.task("build", function(fn) {
  run("clean", "copy", "normalize", "style", "images", "symbols", fn);
});


gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2,eot,svg,ttf}",
    "source/fonts/**/*.css",
    "source/img/**",
    "source/js/**",
    "source/*.html",
    "source/video/**"
  ], {
    base: "source/."
  })
    .pipe(gulp.dest("build"));
});


gulp.task("clean", function() {
  return del("build");
});
