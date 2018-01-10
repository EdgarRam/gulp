'use strict';
module.exports = ( config,dest ) =>{
    const gulp = require('gulp')
    const plumber = require('gulp-plumber')
    const sass = require( 'gulp-sass' )

    let options = dest == 'dist' ? {outputStyle: 'compressed'} : {};

    options.includePaths = [ 'src/commons/styles/', 'src/' ]

    var tasks = [];
    // console.log(config);
    config.apps.forEach( ( val ) =>{

        gulp.task( `sass:${val.name}`, ( ) =>
            setTimeout(() =>
                gulp
                .src( config.folders.sass[ val.name ] )
                .pipe( plumber())
                .pipe( sass( options ).on( 'error', sass.logError ) )
                .pipe( gulp.dest( `${config.folders[dest]}/${val.name}` ) )
            , 500)
        )


        tasks.push( `sass:${val.name}` )
    });

    gulp.task( 'sass', tasks );


}
