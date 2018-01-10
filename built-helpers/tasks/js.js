'use strict';
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const concat = require('gulp-concat')
const gulpif = require('gulp-if');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate')
const gulpIgnore = require('gulp-ignore');


module.exports = ( config, dest ) =>{

    let options = dest == 'dist' ? {outputStyle: 'compressed'} : {}
    // let PATH = `${config.folders.src}/public/modules/`
    var jshintConfig = require( '../jslint.js' )

    let optsConcat = { newLine: `

`};


    var condition = function (file) {
        if (file.jshint.success) {
            return false;
        }

        console.log('JSHINT fail in', file.path );
        file.jshint.results.forEach(function (result) {
            if (!result.error) {
                return;
            }

            const err = result.error
            console.log(`  line ${err.line}, col ${err.character}, code ${err.code}, ${err.reason}\n`);
        });

        console.log( '\n\n');

        return true;
    };


    var tasks = [];
    // console.log(config);
    config.apps.forEach( ( val ) =>{
        var dependencies = require( `../../src/${val.name}/${val.config}` )

        gulp.task( `js:dependencies${val.name}`, () =>
            gulp
            .src( dependencies.js )
            .pipe( concat('dependencies.js'))
            .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/scripts` ) )
        )

        tasks.push( `js:dependencies${val.name}` );


        if( dest == 'build' ){
            gulp.task( `js:Modules${val.name}`,()=>

                gulp.src( [
                    `${config.folders.src}/${val.name}/**/*module*.js`,
                    `!${config.folders.src}/${val.name}/dependencies.js`
                ])
                .pipe(jshint( jshintConfig ))
                .pipe(gulpIgnore.exclude(condition))
                .pipe( concat('vendor-modules.js'))
                .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/scripts` ) )
            )

            tasks.push( `js:Modules${val.name}` );


            gulp.task( `js:App${val.name}`,()=>

                gulp.src( [
                    `${config.folders.src}/${val.name}/**/*.js`,
                    `!${config.folders.src}/${val.name}/**/*module*.js`,
                    `!${config.folders.src}/${val.name}/dependencies.js`
                ])
                .pipe(jshint( jshintConfig ))
                .pipe(gulpIgnore.exclude(condition))
                .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/scripts/app` ) )
            )

            tasks.push( `js:App${val.name}` );

        }
        else {

            gulp.task( `js:Modules${val.name}`,()=>

                gulp.src( [
                    `${config.folders.src}/${val.name}/**/*module*.js`,
                    `!${config.folders.src}/${val.name}/dependencies.js`
                ])
                .pipe(jshint( jshintConfig ))
                .pipe(gulpIgnore.exclude(condition))
                .pipe( ngAnnotate({
                    single_quotes: true,
                    add: true,
                }) )
                .pipe( concat('vendor-modules.js'))
                .pipe( uglify() )
                .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/scripts` ) )
            )

            tasks.push( `js:Modules${val.name}` );


            gulp.task( `js:App${val.name}`,()=>

                gulp.src( [
                    `${config.folders.src}/${val.name}/**/*.js`,
                    `!${config.folders.src}/${val.name}/**/*module*.js`,
                    `!${config.folders.src}/${val.name}/dependencies.js`
                ])
                .pipe(jshint( jshintConfig ))
                .pipe(gulpIgnore.exclude(condition))
                .pipe( ngAnnotate({
                    single_quotes: true,
                    add: true,
                }) )
                .pipe( concat('vendor-app.js'))
                .pipe( uglify() )
                .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/scripts/app` ) )
            )

            tasks.push( `js:App${val.name}` );

        }


        gulp.task( 'js', tasks );

    })

}
