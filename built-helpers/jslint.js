var config ={
  /*** Globals ***/
  // To ignore any custom global variables, enable the `predef` option and list
  // your variables within it.
  "predef": [
    "window",
    "document",
    "jQuery",
    "setTimeout",
    "clearTimeout",
    "setInterval",
    "clearInterval",
    "angular",
    "R",
    "$",
    "google",
    "moment",
    "Modernizr",
  ],



  /*** Relaxing options ***/
  // Set these to `true` to relax, or `false` to enforce.
  "bitwise": false,
  "debug": false,
  "es5": true,
  "evil": false,
  "eqeqeq" : true,
  "forin": false,
  "newcap": false,
  "nomen": false,
  "plusplus": false,
  "regexp": true,
  "sub": false,
  "undef": true,
  "white": false,
  "validthis": true,
  "strict": true,
  "latedef": false,
  "unused": true,
  "expr": true ,
  "-W058": true,

  /*** Environments ***/
  // Set each environment that you're using to `true`.
  "browser": true,
  "devel": true,
  "node": false,
  "rhino": false,

  /*** Miscellaneous ***/
  "indent": 4,
  "maxerr": 50,
  // "maxlen":     80,
  "passfail": false
}

module.exports = config
