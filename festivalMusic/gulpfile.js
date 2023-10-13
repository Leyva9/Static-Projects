const { src, dest, watch, parallel} = require("gulp");
//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
//Images
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

// CSS
function css( cb ) {   
    src('src/scss/**/*.scss') //Identificar el archivo de SASS
        .pipe( plumber() ) //Se utiliza para que no se detenga el watch en caso de que haya error en la compilacion
        .pipe( sass() )  //Compilarlo
        .pipe( dest('build/css') ); //Guardarlo en el disco duro

    cb(); // Esto es un call back que se utiliza para decirle a gulp que esta funcion llego al final
}

function dev(cb) {
    watch('src/scss/**/*.scss', css)

    cb();
}

// Imgs
function gulpWebp(cb) {
    const options = {
        quality: 50
    };

    src("./src/img/**/*.{jpg, png}") 
        .pipe( webp( options ) )
        .pipe( dest( "./build/img" ) )

    cb();
}

function imgMin(cb) {
    const options = {
        optimizationLevel: 3
    }
    src("./src/img/**/*.{jpg, png}")
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

exports.css = css; // Permite que nuestra funcion este disponible para usar con el nombre de styles y se ejecuta en la consola de la siguiente manera, 'npx gulp styles'
exports.gulpwebp = gulpWebp; 
exports.imgMin = imgMin;
exports.imgAvif = imgAvif;

exports.dev = parallel( imgAvif, imgMin, gulpWebp, dev );