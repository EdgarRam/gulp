const gulp = require('gulp')
const watch = require('gulp-watch')
const sync = require('gulp-sync')(require('gulp'))
const connect = require('gulp-connect');


function tasks( _task ) {
    return function(vinyl){
        gulp.start( _task )
    }
}

module.exports = ( config ) =>


    gulp.task('watch', () =>{


        config.apps.forEach( ( val ) =>{
            watch( [
                `${config.folders.src}/${val.name}/**/*.scss`
            ], tasks( sync.sync([`sass:${val.name}`, 'reload' ]) ) );



            watch(  [
                    `${config.folders.src}/${val.name}/**/*.html`,
                    `!${config.folders.src}/${val.name}/index.html`,
                ], tasks( sync.sync( [`templateCache:${val.name}`, 'reload' ] ) )
            );


            watch( `${config.folders.src}/${val.name}/index.html`,
                tasks( sync.sync([ `copy:index${val.name}`, `inject:${val.name}`, 'reload'] ) )
            );




            watch( [
                `${config.folders.src}/${val.name}/**/*module*.js`,
                `!${config.folders.src}/${val.name}/dependencies.js`
            ],{ readDelay: 100 } ,tasks( sync.sync([`js:Modules${val.name}`, 'reload' ])  ));




            watch( [
                `${config.folders.src}/${val.name}/**/*.js`,
                `!${config.folders.src}/${val.name}/**/*module*.js`,
                `!${config.folders.src}/${val.name}/${val.config}`
            ], { events: [ 'change' ], readDelay: 100 }, tasks(  sync.sync([`js:App${val.name}`, 'reload' ]) ));



            watch( [
                `${config.folders.src}/${val.name}/**/*.js`,
                `!${config.folders.src}/${val.name}/**/*module*.js`,
                `!${config.folders.src}/${val.name}/${val.config}`
            ], { events: [ 'add', 'unlink' ] }, tasks(  sync.sync( [ `js:App${val.name}`, `inject:${val.name}`, 'reload'] ) ));



            watch( `${config.folders.src}/${val.name}/${val.config}`,
                tasks( sync.sync([`js:dependencies${val.name}`, 'reload']) ) );

        });

        watch( [
            `${config.folders.src}/commons/styles/**/*.scss`
        ], tasks( sync.sync(['sass', 'reload']) )
        );


    });
