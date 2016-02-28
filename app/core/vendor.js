module.exports = function () {
    require('../index.scss');


    /* JS */
    global.$ = global.jQuery = require('jquery');
    require('angular');
};