const { src, dest, watch, parallel} = require("gulp");
//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Images
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

//JavaScript
const terser = require("gulp-terser-js");

// CSS
function css( cb ) {   
    src('src/scss/**/*.scss') //Identificar el archivo de SASS
        .pipe(sourcemaps.init()) // Guarda las referencias de los archivos css
        .pipe( plumber() ) //Se utiliza para que no se detenga el watch en caso de que haya error en la compilacion
        .pipe( sass() )  //Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.')) // Ubicacion donde se van a guardar las referecias
        .pipe( dest('build/css') ) //Guardarlo en el disco duro
    cb(); // Esto es un call back que se utiliza para decirle a gulp que esta funcion llego al final
}

function dev(cb) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    cb();
}

// Imgs
function gulpWebp(cb) {
    const options = {
        quality: 50
    };

    src("./src/img/**/*.{jpg,png}") 
        .pipe( webp( options ) )
        .pipe( dest( "./build/img" ) )

    cb();
}

function imgMin(cb) {
    const options = {
        optimizationLevel: 3
    }
    src("./src/img/**/*.{jpg,png}")
        .pipe( cache( imagemin( options ) ) )
        .pipe( dest("./build/img") )
    cb();
}

function imgAvif(cb) {
    const options = {
        quality: 50
    }
    src("./src/img/**/*.{jpg, png}")
        .pipe( avif( options ) )
        .pipe( dest("./build/img") )
    cb();
}

// JavaScript
function javascript(cb) {
    src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/js'));
    cb();
}

exports.css = css; // Permite que nuestra funcion este disponible para usar con el nombre de styles y se ejecuta en la consola de la siguiente manera, 'npx gulp styles'
exports.js = javascript; 
exports.gulpwebp = gulpWebp; 
exports.imgMin = imgMin;
exports.imgAvif = imgAvif;
exports.javascript = javascript;

exports.dev = parallel( javascript, imgAvif, imgMin, gulpWebp, dev );