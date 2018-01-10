const gulp      = require('gulp')
const inject   = require('gulp-inject');


module.exports = ( config, dest ) => {

    var tasks = [];


    config.apps.forEach( ( val ) =>{

        gulp.task( `inject:${val.name}`, ()=>{


            setTimeout( function(){
                gulp.src(`./${config.folders[dest]}/${val.name}/index.html`)
                .pipe( inject(
                    gulp.src( `${config.folders[dest]}/${val.name}/**/*.js`) , {relative: true} )
                )
                .pipe( gulp.dest( `./${config.folders[dest]}/${val.name}` ) )

            }, 200);

        })


        tasks.push(`inject:${val.name}`)

    });


    gulp.task( 'inject', tasks )

}
