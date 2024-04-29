// npm modules
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const combineMq = require("gulp-combine-mq");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const kit = require("gulp-kit");
const urlencode = require("gulp-css-urlencode-inline-svgs");
const browserSync = require("browser-sync");
const through = require("through2");
const webpack = require("webpack-stream");
const webpackCompiler = require("webpack");

// Local modules
const { DEVELOPMENT_CONFIG, PRODUCTION_CONFIGS } = require("./webpack.config");

// Configuration helpers
const WEBPACK_ENV = { DEVELOPMENT: "development", PRODUCTION: "production" };
const { NODE_ENV = WEBPACK_ENV.DEVELOPMENT } = process.env;
const reload = browserSync.reload;
const clientlibComponentsRoot = "src/main/content/jcr_root/etc/clientlibs/stjude/wbss";
const src = {
  scss: `${clientlibComponentsRoot}/libs.cedar/src/scss/{_settings,components,foundation,partials,templates}/*.scss`,
  kit: `${clientlibComponentsRoot}/**/src/markup/{.,**}/*.kit`,
  js: `${clientlibComponentsRoot}/**/src/js/{.,**}/{.,**}/*.js`
};
const webpackTaskNames = [];

/**
 * Markup Tasks
 */

// Compile .kit files out to html pages
gulp.task("markup", function() {
  console.log("Compiling Markup");
  return gulp
    .src(src.kit)
    .pipe(kit({ compilePartials: false }))
    .pipe(
      through.obj((file, _, cb) => {
        file.path = file.path.replace(
          /\/(generalpage|twocolpagefixedright)\/src\/markup/,
          ""
        );
        cb(null, file);
      })
    )
    .pipe(gulp.dest("dist/"));
});

/**
 * Javascript Tasks
 */

/**
 * Compile each source JavaScript module based on Webpack config module's
 *  array export
 *
 * webpack-stream does not allow a single Webpack config to output an array
 *  and compile each config in an array, so this loop is used
 *
 * Source: https://github.com/shama/webpack-stream/issues/203#issuecomment-418308222
 */
PRODUCTION_CONFIGS.forEach(webpackConfig => {
  const configName = webpackConfig.name;
  const configEntry = webpackConfig.entry[configName];
  const taskName = `webpack:${configName}`;

  /**
   * Push task name to array in module scope to use in 'watch'/'default' tasks
   */
  webpackTaskNames.push(taskName);

  gulp.task(taskName, () => {
    console.log(
      `Compiling JavaScript for ${configName} using Webpack in ${NODE_ENV} mode`
    );

    return (
      gulp
        .src(configEntry)
        .pipe(webpack(webpackConfig, webpackCompiler))

        // Pipe output to clientlib JS source directory
        .pipe(gulp.dest(webpackConfig.output.path))

        // Pipe output to dist/js for prototyping environment
        .pipe(gulp.dest("dist/js"))
    );
  });
});

gulp.task("webpack", () => {
  console.log(`Compiling JavaScript using Webpack in ${NODE_ENV} mode`);
  return gulp
    .src(src.js)
    .pipe(webpack(DEVELOPMENT_CONFIG, webpackCompiler))
    .pipe(gulp.dest("dist/js/"));
});

/**
 * Style Tasks
 */

// Compile author styles
gulp.task("prototype-author-styles", () => {
  console.log(
    "Compile Author Sass styles, autoprefix, combine media queries, and minify CSS"
  );

  return gulp
    .src([`${clientlibComponentsRoot}/libs.cedar/src/scss/ams-author.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }, { sourcemap: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "ie 11",
        "opera 12.1",
        "ios 8",
        "android 4",
        "Edge 12",
        "Chrome 49",
        "ff 45-48",
        "Samsung 4"
      )
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(urlencode())
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleanCSS());
});

gulp.task("author-styles", () => {
  console.log(
    "Compile Author Sass styles, autoprefix, combine media queries, and minify CSS"
  );

  return gulp
    .src([`${clientlibComponentsRoot}/libs.cedar/src/scss/ams-author.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }, { sourcemap: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "ie 11",
        "opera 12.1",
        "ios 8",
        "android 4",
        "Edge 12",
        "Chrome 49",
        "ff 45-48",
        "Samsung 4"
      )
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(urlencode())
    .pipe(gulp.dest(`${clientlibComponentsRoot}/libs.author/css/`))
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleanCSS());
});

// Compile critical styles
gulp.task("prototype-critical-styles", () => {
  console.log(
    "Compile Critical Sass styles, autoprefix, combine media queries, and minify CSS"
  );

  return gulp
    .src([`${clientlibComponentsRoot}/libs.cedar/src/scss/critical.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }, { sourcemap: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "ie 11",
        "opera 12.1",
        "ios 8",
        "android 4",
        "Edge 12",
        "Chrome 49",
        "ff 45-48",
        "Samsung 4"
      )
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(urlencode())
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleanCSS());
});

gulp.task("critical-styles", () => {
  console.log(
    "Compile Critical Sass styles, autoprefix, combine media queries, and minify CSS"
  );

  return gulp
    .src([`${clientlibComponentsRoot}/libs.cedar/src/scss/critical.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }, { sourcemap: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "ie 11",
        "opera 12.1",
        "ios 8",
        "android 4",
        "Edge 12",
        "Chrome 49",
        "ff 45-48",
        "Samsung 4"
      )
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(urlencode())
    .pipe(gulp.dest(`${clientlibComponentsRoot}/libs.critical/css/`))
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleanCSS());
});

// Compile two-column styles
gulp.task("two-column-styles", () => {
  console.log(
    "Compile Two-Column Sass styles, autoprefix, combine media queries, and minify CSS"
  );

  return gulp
    .src([`${clientlibComponentsRoot}/libs.cedar/src/scss/templates/two-column.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }, { sourcemap: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "ie 11",
        "opera 12.1",
        "ios 8",
        "android 4",
        "Edge 12",
        "Chrome 49",
        "ff 45-48",
        "Samsung 4"
      )
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(urlencode())
    .pipe(
      gulp.dest(`${clientlibComponentsRoot}/libs.cedar/css/templates/two-column/css/`)
    )
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleanCSS());
});

// Compile general styles
gulp.task("general-styles", () => {
  console.log(
    "Compile General Sass styles, autoprefix, combine media queries, and minify CSS"
  );

  return gulp
    .src([`${clientlibComponentsRoot}/libs.cedar/src/scss/templates/general.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }, { sourcemap: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "ie 11",
        "opera 12.1",
        "ios 8",
        "android 4",
        "Edge 12",
        "Chrome 49",
        "ff 45-48",
        "Samsung 4"
      )
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(urlencode())
    .pipe(gulp.dest(`${clientlibComponentsRoot}/libs.cedar/css/templates/general/css/`))
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleanCSS());
});

// Compile Sass for prototypes
gulp.task("prototype-template-styles", function() {
  console.log("Compile Sass, autoprefix, combine mediaqueries and minify css");
  return gulp
    .src([
      `${clientlibComponentsRoot}/libs.cedar/src/scss/templates/two-column.scss`,
      `${clientlibComponentsRoot}/libs.cedar/src/scss/templates/general.scss`
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({ style: "expanded" }, { sourcemap: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(
        "last 2 version",
        "ie 11",
        "opera 12.1",
        "ios 8",
        "android 4",
        "Edge 12",
        "Chrome 49",
        "ff 45-48",
        "Samsung 4"
      )
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(urlencode())
    .pipe(
      through.obj((file, _, cb) => {
        // Nullify scss files in hope-framework detected by gulp-sass
        if (file.path.includes("hope-framework")) {
          cb(null, null);
        } else {
          if (file.path.includes("templates")) {
            file.path = file.path.replace(/templates\//, "css/");
          }

          // Pass through file data for non-Hope files
          cb(null, file);
        }
      })
    )
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleanCSS())
    .pipe(
      rename(function(path) {
        path.basename += "-min";
      })
    )
    .pipe(
      sourcemaps.write("maps", {
        includeContent: false,
        sourceRoot: "dist"
      })
    )
    .pipe(gulp.dest("dist/css/"))
    .pipe(reload({ stream: true }));
});

// Watch Files For Changes
gulp.task(
  "watch",
  [
    "prototype-author-styles",
    "prototype-critical-styles",
    "prototype-template-styles",
    "markup",
    "webpack"
  ],
  function() {
    browserSync.init({
      files: [
        "dist/css/general.css",
        "dist/css/two-column.css",
        "dist/css/critical.css",
        "dist/css/ams-author.css"
      ],
      notify: false,
      server: "./dist",
      startPath: "/supporter-profile.html",
      reloadDebounce: 1000
    });

    // Style watch tasks
    gulp.watch(
      `${clientlibComponentsRoot}/libs.cedar/src/scss/_settings/{config,critical-index}.scss`,
      ["prototype-critical-styles"]
    );
    gulp.watch(src.scss, ["prototype-template-styles"]);
    gulp.watch(`${clientlibComponentsRoot}/libs.cedar/src/scss/ams-author.scss`, [
      "prototype-author-styles"
    ]);

    // Markup watch tasks
    gulp.watch(src.kit, ["markup"]).on("change", reload);

    // JavaScript watch tasks
    gulp.watch(src.js, ["webpack"]).on("change", reload);
  }
);

gulp.task("styles-build", [
  "critical-styles",
  "two-column-styles",
  "general-styles",
  "author-styles"
]);
gulp.task("webpack-build", webpackTaskNames);

if (NODE_ENV === WEBPACK_ENV.PRODUCTION) {
  gulp.task("default", [
    "critical-styles",
    "two-column-styles",
    "general-styles",
    "author-styles",
    ...webpackTaskNames
  ]);
} else {
  gulp.task("default", ["prototype-template-styles", "markup", "webpack"]);
}
