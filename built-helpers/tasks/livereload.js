const gulp = require('gulp')
// const server = require('gulp-server-livereload')
const connect = require('gulp-connect');


module.exports = ( config ) =>{


    gulp.task( `reload`, () =>{
        setTimeout(function () {
            gulp.src( config.folders.build )
            .pipe( connect.reload() );
        }, 500);
    });

}
