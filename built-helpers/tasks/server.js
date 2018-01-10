const gulp = require('gulp')
const connect = require('gulp-connect');


module.exports = ( config ) =>{
    var livereloadPort = 35730;
    var port = 3000;

    var tasks = [];


    gulp.task( `server`, () =>{

        connect.server({
            name: 'Dev App',
            livereload: true,
            port: 3000,
            root: `${config.folders.build}`,
        })
    })


    gulp.task( `server:dist`, () =>

        connect.server({
            directoryListing: false,
            livereload: true,
            port: 3000,
            root: `${config.folders.dist}`,
        })

     )
}
