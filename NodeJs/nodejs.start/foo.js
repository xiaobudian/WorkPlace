var circle = require('./circle.js');

console.log('The area of a circle of radius 4 is ' + circle.area(4));

var module = require('module');
console.log(typeof module);

var eventEmitter = require('./eventEmitter');

eventEmitter.on('ready', function () {
    console.log('module eventEmitter is ready !');
});