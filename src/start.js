/**
 * Created by zhanghaoyi on 17/6/27.
 */
const register = require('babel-core/register');

register({
    presets: ['es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
});
require("babel-polyfill");

require('./app.js');
