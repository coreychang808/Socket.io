'use strict';

require('./logger');

const events = require('./events');

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

/**
 * stringifies data then turns it into uppercase. returns the data 
 * @param {*} data 
 */
const upperCase = (data) => {
  let text = data.toString().toUpperCase();
  console.log(text);
  return Buffer.from(text);
}

const alterFile = (file) => {
  let text = null;

  readFile(file)
    .then(value =>{
      text = upperCase(value);
      return writeFile(file,text)
      .then(() =>{
        events.emit('save', file);
        console.log(`${file} is saved`);
      });
    })
    .catch(error =>{
      throw error;
    })
  };
  

let file = process.argv.slice(2).shift();
alterFile(file);

