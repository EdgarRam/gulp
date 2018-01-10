'use strict';
const config = {}
const src = './src'
const build = './build'
const dist = './dist'

var appsConfig = require( '../apps-config.json' )

config.apps = [];

function getUrlsSass(){
    var urls = {};

    appsConfig.apps.forEach( ( val, key ) =>{
        urls[ val.name ] = `${src}/${val.name}/main.scss`;
        config.apps.push( val );
    } );

    return urls;
}


config.folders = {
    build: build,
	dist: dist,
    src: src,
    sass: getUrlsSass(),
}


config.fn = {

    readFolder: ( folder, destination ) => {
		let fs = require('fs')
		let path = require('path')

		let PATH = path.join( __dirname, folder )
		let FILES = fs.readdirSync(PATH)

		for( var file of FILES )
			require( `${folder}/${file}` )(config,destination)
	}

}

module.exports = config
