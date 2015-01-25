'use strict';

module.exports = function (s) {
  // add http:// if no protocol is specified
  s = (/^s?((f|ht)tps?|mailto):\/\//.test(s)) ? s : `http://${s}`;
  /*
   * remove the trailing slash and/or hash
   *
   * it's a bit controversial:
   * - directories should be appended with a slash
   * but:
   * - we can avoid listing example.com, example.com/,
   *   and example.com/# as different urls
   */
  s = s.replace(/\/?#?$/, '');
  return s;
};

