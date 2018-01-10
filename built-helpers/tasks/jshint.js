const gulp = require('gulp')
const jshint = require('gulp-jshint')


module.exports = ( config, dest ) =>{
    var jshintConfig = require( '../jslint.js' )

    var tasks = [];


    config.apps.forEach( ( val ) =>{

        gulp.task( `jshint:${val.name}`, () =>
            gulp.src( [
                `${config.folders.src}/${val.name}/**/*.js`,
                `!${config.folders.src}/${val.name}/dependencies.js`
            ])
            .pipe( jshint( jshintConfig ) )
            .pipe( jshint.reporter() )
        )

        tasks.push( `jshint:${val.name}` );
    });

    gulp.task( 'jshint', tasks )
}
