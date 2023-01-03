const {parallel, series, watch, src, dest} = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');


const serv = (cb) => {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        browser: "Chrome",
        open: true,
    });
    cb()
};




const styles = (cb) => {
    src("./src/styles/styles.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(
            autoprefixer({
                cascade: true,
                overrideBrowserslist: ['last 5 versions'],
            }),
        )
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
    cb();
};

const scripts = (cb) => {
    src("./src/js/scripts.js")
        .pipe(minify())
        .pipe(dest("./dist/js"))
        .pipe(browserSync.stream());
    cb();
};



const cleanDist = (cb) => {
    del.sync(['./dist']);
    cb();
}

const imageMin = (cb) => {
    src('./src/images/**/*.{jpg,jpeg,png,svg}')
        .pipe(
        imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
            }),
        ]),
    )
        .pipe(dest('dist/images'));
    cb();
}

const images = (cb) => {
    src('./src/images/**/*.{jpg,jpeg,png,svg}')
        .pipe(dest('./dist/images'));
    cb();
}

const watcher = (cb) => {
    watch("*.html").on("change", browserSync.reload);
    watch("./src/js/*.js").on("change", series(scripts, browserSync.reload));
    watch("./src/styles/**/*.scss", styles);
    watch("./src/images/**/*.{jpg,jpeg,png,svg}").on("change", series(images, browserSync.reload));
    cb();
};




exports.dev = parallel(serv, watcher, series(styles, scripts,images));
exports.build = series(cleanDist,styles,scripts,imageMin);
exports.clean = cleanDist;
