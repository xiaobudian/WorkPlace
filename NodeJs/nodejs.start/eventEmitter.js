var eventEmitter = require('events').EventEmitter;

module.exports = new eventEmitter();

setTimeout(function () {
    module.exports.emit('ready');
}, 1000);