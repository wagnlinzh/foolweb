


var sub = require('./sub');

var app  = document.createElement('div');





app.innerHTML = '<h1>Hello World hello fool </h1>';
app.appendChild(sub());
document.body.appendChild(app);

import moment from 'moment';
require("./main.css");

import $ from 'jquery';

import 'imports?jQuery=jquery!./plugin.js';

// myPromise.then(() => {
  $('body').append('<p><b>promise result is ' + ' now is ' + moment().format() + '</b></p>');
  //call our jquery plugin!
  $('p').greenify();
// });