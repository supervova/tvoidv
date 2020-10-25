/**
 * -----------------------------------------------------------------------------
 * 🎛 COMMON PLUGINS AND SETTINGS
 * -----------------------------------------------------------------------------
 */
// #region

/**
 * ☝️🧐 Uncss shows better results when styles are checked against special pages
 * containing all interface and text components.
 */
const gulp        = require('gulp');

const browserSync = require('browser-sync').create();
const changed     = require('gulp-changed');
const gulpif      = require('gulp-if');
// const newer       = require('gulp-newer');
// Prevent pipe breaking caused by errors from gulp plugins
const plumber     = require('gulp-plumber');
const size        = require('gulp-size');
const sourcemaps  = require('gulp-sourcemaps');
const yargs       = require('yargs').alias('p', 'production');

// Look for the --p flag
const PRODUCTION  = !!(yargs.argv.production);

// Config
const config = {
  root: '.',
  src: './src',
  dest: './dist',
};

const paths = {
  css: {
    src: {
      main: `${config.src}/style.scss`,
      head: `${config.src}/css/head-styles/*.scss`,
    },
    watch: `${config.src}/**/*.scss`,
    tmp: `${config.src}/css`,
    dest: `${config.dest}/css`,
  },

  markup: {
    src: [
      `${config.src}/pages/**/*.twig`,
      `!${config.src}/pages/wip.twig`,
      `!${config.src}/pages/base/*.twig`,
    ],
    dest: `${config.src}`,
  },

  img: {
    src: {
      graphics: [
        `${config.src}/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
        `!${config.src}/base/graphics/sprite/**/*`,
        `!${config.src}/img/**/*`,
      ],
      content: `${config.src}/img/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
    },
    watch: `${config.src}/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
    dest: `${config.dest}/img`,
  },

  js: {
    src: {
      main: [
        `${config.src}/**/*.js`,
        `!${config.src}/base/content/content.js`,
        `!${config.src}/base/form/form.js`,
        `!${config.src}/components/navbar/navbar.js`,
        `!${config.src}/js/new.js`,
        `!${config.src}/js/alt.js`,
        `!${config.src}/util/*.js`,
        `!${config.src}/js/vendor/*.js`,
      ],
      plugins: [
        './node_modules/bootstrap/js/dist/util.js',
        './node_modules/bootstrap/js/dist/carousel.js',
      ],
      unoptimized: `${config.src}/js/vendor/*.js`,
    },
    dest: `${config.dest}/js`,
  },

  sprite: {
    src: `${config.src}/base/graphics/sprite/*.svg`,
    dest: `${config.src}/base/graphics`,
  },

  misc: {
    src: [`${config.root}/CNAME`],
    dest: config.dest,
  },
};

const settings = {
  css: {
    // autoprefixer (browserslist) has been set in package.json

    uncss: {
      ignore: [

        /* eslint-disable max-len */
        // Bootstrap
        /\w\.in/, /\.navbar(-[a-zA-Z]+)?/, /\.modal(-[a-zA-Z]+)?/, /\.dropdown(-[a-zA-Z]+)?/, /\.carousel(-[a-zA-Z]+)?/, /\.open/, /\.fade/, /\.collaps((-[a-zA-Z])+)?/,

        // Custom
        /\.page.has-open-slide(-[a-zA-Z]+)?/, /\.note/, /\.hlaquo-h1/, /\.slaquo-h1/, /\.vk/, /iframe/, /\.mb(-[a-zA-Z0-9]+)?/, /\.mt(-[a-zA-Z0-9]+)?/,
        /* eslint-enable max-len */
      ],
    },
  },

  sprite: {
    mode: {
      symbol: {
        dest: '.', // Mode specific output directory
        sprite: 'sprite.svg', // Sprite path and name
        prefix: '.', // Prefix for CSS selectors
        dimensions: '', // Suffix for dimension CSS selectors
        example: true, // Create an HTML example document
      },
    },
    svg: {
      xmlDeclaration: false, // strip out the XML attribute
      doctypeDeclaration: false, // don't include the !DOCTYPE declaration
    },
  },
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🎨 STYLES
 * -----------------------------------------------------------------------------
 */
// #region

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const sass         = require('gulp-sass');
const postcss = require('gulp-postcss');
const uncss = require('postcss-uncss');

// COMMON STYLES FUNCTION
const cssTasks = (src, subtitle, uncssHTML, dest, link = true) => gulp.src(src)
  .pipe(plumber())
  .pipe(changed(paths.css.dest))
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .pipe(sass({
    precision: 4,
    includePaths: ['.'],
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(gulp.dest(paths.css.tmp))
  .pipe(
    gulpif(
      PRODUCTION,
      gulpif(
        link,
        postcss([
          uncss({
            html: uncssHTML,
            ignore: [
              /* eslint-disable max-len */
              // Bootstrap
              /\w\.fade/,
              /\.collapse?(ing)?/,

              // Custom
              /\.vk/,
              /iframe/,
              /\.[hs]laquo-[a-z0-9]+/,
              /\.[mp][tb]-(((sm|md|mdl|lg|xl|xxl)-)*?)[0-9s]+/,
              /\.mx-(.*?)auto+/,
              /* eslint-enable max-len */
            ],
          }),
        ])
      )
    )
  )
  .pipe(gulpif(PRODUCTION, cleanCSS()))
  .pipe(size({ title: `styles: ${subtitle}` }))
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream());

// MAIN
function cssMain(done) {
  cssTasks(
    paths.css.src.main, // src
    'main', // subtitle
    // uncssHTML; use array syntax for normal results
    [`${config.dest}/**/*.html`],
    paths.css.dest,
  );
  done();
}

// HEAD
function cssHead(done) {
  cssTasks(
    paths.css.src.head, // src
    'head', // subtitle
    [`${config.dest}/**/*.html`],
    paths.css.dest,
    false,
  );
  done();
}

// STYLES BUILD
const css = gulp.parallel(
  cssHead,
  cssMain,
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🖼 IMAGES
 * -----------------------------------------------------------------------------
 */
// #region

const imagemin    = require('gulp-imagemin');
const imageminGIF = require('imagemin-gifsicle');
const imageminJPG = require('imagemin-mozjpeg');
const imageminPNG = require('imagemin-pngquant');
const imageminSVG = require('imagemin-svgo');

// Common images function
const imgTasks = (src, subtitle) => gulp.src(src)
  .pipe(changed(`${config.dest}/img`))
  .pipe(
    imagemin(
      [
        imageminGIF({
          interlaced: true,
          optimizationLevel: 3,
        }),
        imageminJPG({ quality: 85 }),
        imageminPNG([0.8, 0.9]),
        imageminSVG({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: false },
          ],
        }),
      ],
      { verbose: true },
    ),
  )
  .pipe(gulp.dest(`${config.dest}/img`))
  .pipe(size({ title: `images: ${subtitle}` }));

// Graphics
function imgGraphics(done) {
  imgTasks(
    paths.img.src.graphics, // src
    'graphics', // subtitle
    true,
  );
  done();
}

function imgContent(done) {
  imgTasks(
    paths.img.src.content, // src
    'content', // subtitle
  );
  done();
}

// OPTIMIZE
const img = gulp.parallel(
  imgGraphics,
  imgContent,
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ❤️ SVG SPRITE
 * -----------------------------------------------------------------------------
 */
// #region

const svgSprite = require('gulp-svg-sprite');

function svg() {
  return gulp.src(paths.sprite.src)
    .pipe(svgSprite(settings.sprite))
    .pipe(gulp.dest(paths.sprite.dest));
}

const sprite = gulp.series(
  svg,
  gulp.parallel(cssMain, imgGraphics),
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📰 MARKUP
 * -----------------------------------------------------------------------------
 */
// #region

// TWIG
const prettify = require('gulp-jsbeautifier');
const twig     = require('gulp-twig');

function buildTwig() {
  // build to the parent folder, .i.e. src/
  // return gulp.src(paths.markup.src)
  // build to the same folder
  return gulp.src(paths.markup.src, { base: './src/pages/' })
    .pipe(plumber())
    .pipe(twig({
      base: paths.markup.dest,
    }))
    .pipe(prettify({
      html: {
        indent_size: 2,
        max_preserve_newlines: 0,
        wrap_line_length: 0,
        unformatted: ['a', 'abbr', 'br', 'small', 'span', 'strong', 'svg'],
      },
    }))
    .pipe(size({ title: 'html' }))
    .pipe(gulp.dest(config.dest));
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 💾 SCRIPTS
 * -----------------------------------------------------------------------------
 */
// #region

const webpack = require('webpack-stream');

function jsMain() {
  return gulp.src(`${config.src}/js/main.js`)
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: '[name].js',
      },
      // To avoid Node deprecation warning, we may need to try plug in
      // webpack.config - https://github.com/idzhurov/es6-starter-pack
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
        ],
      },
    }))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

const babel  = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
/* uglify-js does not support ES6+. use gulp-uglify-es instead which uglify with
'terser' which support ES6+ */
// const uglifyES = require('gulp-uglify-es').default;

// Common scripts function
const jsTasks = (src, file, compiler) => gulp.src(src)
  .pipe(plumber())
  // Use webpack instead others
  // .pipe(webpackstream(webpackconfig, webpack))
  .pipe(changed(paths.js.dest))
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .pipe(gulpif(compiler, babel({ presets: ['@babel/preset-env'] })))
  .pipe(concat(`${file}.js`))
  .pipe(gulpif(PRODUCTION, uglify()))
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(size({ title: `scripts: ${file}` }))
  .pipe(gulp.dest(paths.js.dest));
  // .pipe(browserSync.stream());

// Plugins
function jsPlugins(done) {
  jsTasks(
    paths.js.src.plugins, // src
    'plugins', // file
  );
  done();
}

function jsUnoptimized() {
  return gulp.src(paths.js.src.unoptimized, { base: `${config.src}/js/` })
    .pipe(changed(paths.js.dest))
    .pipe(size({ title: 'unoptimized scripts' }))
    .pipe(gulp.dest(paths.js.dest));
}

// SCRIPTS BUILD
const js = gulp.parallel(
  jsPlugins,
  jsMain,
  jsUnoptimized,
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🛠 UTILITIES
 * -----------------------------------------------------------------------------
 */
// #region

// CLEAN
const del = require('del');

// Assets
function cleanAssets() {
  return del([
    `${paths.css.dest}/**/*`,
    // `${config.dest.site}_includes/critical.css`,
    `${paths.js.dest}/**/*`,
    `${paths.img.dest}/**/*`,
  ]);
}

// COPY
function fonts() {
  return gulp.src(`${config.src}/fonts/*.woff`, { base: config.src, since: gulp.lastRun(fonts) })
    .pipe(gulp.dest(config.dest));
}

function copyMisc() {
  return gulp.src(paths.misc.src)
    .pipe(gulp.dest(paths.misc.dest));
}

const copy = gulp.series(
  fonts,
  copyMisc,
);

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📶 SERVER
 * -----------------------------------------------------------------------------
 */
// #region

const { reload } = browserSync;

function watch() {
  gulp.watch(paths.css.watch, gulp.series(css));
  gulp.watch(paths.js.src.main, gulp.series(jsMain));
  gulp.watch(paths.img.watch).on('change', gulp.series(img, reload));
  gulp.watch(paths.markup.src).on('change', gulp.series(buildTwig, reload));
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: config.dest,
    },
    port: 9000,
    notify: false,
  });
  watch();
  done();
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🏗 BUILD / DEFAULT
 * -----------------------------------------------------------------------------
 */
// #region

const build = gulp.series(
  svg,
  copy,
  img,
  gulp.parallel(css, js),
);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📤 DEPLOY
 * -----------------------------------------------------------------------------
 */
// #region

const ghPages = require('gulp-gh-pages');

function deploy() {
  return gulp.src(`${config.dest}/**/*`)
    .pipe(ghPages());
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ☑️ TASKS
 * -----------------------------------------------------------------------------
 */

/* eslint-disable no-multi-spaces */
exports.clean   = cleanAssets;
exports.copym   = copyMisc;
exports.copyf   = fonts;
exports.copy    = copy;
exports.twig    = buildTwig;
exports.sprite  = sprite;
exports.img     = img;
exports.jsu     = jsUnoptimized;
exports.jsp     = jsPlugins;
exports.jsm     = jsMain;
exports.js      = js;
exports.cssh    = cssHead;
exports.cssm    = cssMain;
exports.css     = css;
exports.deploy  = deploy;
exports.s       = serve;
exports.default = build;
