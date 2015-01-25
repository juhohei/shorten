'use strict';

module.exports = function (s) {
  // add http:// if no protocol is specified
  s = (/^s?((f|ht)tps?|mailto):\/\//.test(s)) ? s : `http://${s}`;
  // remove trailing slash and/or hash
  s = s.replace(/\/?#?$/, '');
  return s;
};

