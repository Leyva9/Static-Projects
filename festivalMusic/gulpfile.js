const { src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");

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

exports.styles = css; // Permite que nuestra funcion este disponible para usar con el nombre de styles y se ejecuta en la consola de la siguiente manera, 'npx gulp styles'
exports.dev = dev;