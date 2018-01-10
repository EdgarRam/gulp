const gulp = require('gulp')
const concat = require('gulp-concat')

module.exports = ( config, dest ) =>{

    var tasks = [];
    // console.log(config);


    config.apps.forEach( ( val ) =>{


        var dependencies = require( `../../src/${val.name}/${val.config}` )

        gulp.task( `copy:bower${val.name}`  , ( ) =>
             gulp
             .src( dependencies.css )
             .pipe( concat('dependencies.css'))
             .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/` ) )
         )

         tasks.push( `copy:bower${val.name}` );



          gulp.task( `copy:assetsCommons${val.name}`, ( ) =>
              gulp
              .src( config.folders.src + '/commons/assets/commons/**/*' )
              .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/assets` ) )
          )

          tasks.push( `copy:assetsCommons${val.name}` );


           gulp.task( `copy:assets${val.name}`, ( ) =>
               gulp
               .src( config.folders.src + `/commons/assets/${val.name}/**/*` )
               .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/assets` ) )
           )

           tasks.push( `copy:assets${val.name}` );


            gulp.task( `copy:fontsBower${val.name}` , ( ) =>
                gulp
                .src( dependencies.fonts )
                .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/fonts` ) )
            )

            tasks.push( `copy:fontsBower${val.name}` );


             gulp.task( `copy:index${val.name}`, ( ) =>
                 gulp
                 .src( `${config.folders.src}/${val.name}/*.html` )
                 .pipe( gulp.dest( `${config.folders[dest]}/${val.name}` ) )
             )

            tasks.push( `copy:index${val.name}` );
    })

    var dependencies = require( `../dependencies.js` )

    gulp.task( `copy:fontsAwesome` , ( ) =>
        gulp
        .src( dependencies.fonts )
        .pipe( gulp.dest( `${config.folders[dest]}/fonts` ) )
    )

    tasks.push( `copy:fontsAwesome` );


     gulp.task( 'copy', tasks )


}
