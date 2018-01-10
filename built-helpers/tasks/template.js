const gulp = require('gulp')
const plumber = require('gulp-plumber')
const templateCache = require('gulp-angular-templatecache');
const sync = require('gulp-sync')(require('gulp'))

module.exports = ( config, dest ) =>{

    var tasks = [];
    // console.log(config);
    config.apps.forEach( ( val ) =>{

        gulp.task( `templateCache:${val.name}`, () =>
            gulp
             .src( [
                 `${config.folders.src}/${val.name}/**/*.html`,
                 `!${config.folders.src}/${val.name}/index.html`
             ])
             .pipe( plumber())
             .pipe( templateCache({
                 module :'dinn.templates',
                 standalone : true,
                 transformUrl: function(url) {
                     url = url.replace( 'app', '')
                     url = url.replace( 'modules', '')
                     url = url.replace( 'common', '')
                     return url;
                 }
             }) )
             .pipe( gulp.dest( `${config.folders[dest]}/${val.name}/scripts` ) )
        )

        tasks.push( `templateCache:${val.name}` )
    });

    gulp.task( 'templateCache',  tasks )


}
