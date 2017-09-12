'use strict';

function deepClone(someObject) {
  return JSON.parse(JSON.stringify(someObject));
}

module.exports = deepClone;