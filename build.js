const uglify = require('uglify-js');
const fs = require('fs');
const pack = require('./package.json');


// js
let js = fs.readFileSync('./src/lt.js').toString();
const result = uglify.minify(js);
if(result.error) {
    console.log(result.error);
} else {
    fs.writeFileSync('./dist/lt.js', result.code);
    console.log('listen-template is built!')
}
