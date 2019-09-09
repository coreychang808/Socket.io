'use strict';

const events = require('./events');

events.on('save', file => log('save', file));

function log(event,file){
    console.log(`${file} is saved`);
}
