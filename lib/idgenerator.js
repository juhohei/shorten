'use strict';

const CHARS     = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ';
const LENGTH    = CHARS.length;
const ID_LENGTH = 5;
const MAX_IDS   = Math.pow(LENGTH, ID_LENGTH); // ~900 million unique ids

function randomId() {
    let id = '';

    for (let i = 0; i < ID_LENGTH; ++i) {
      id += CHARS.charAt(Math.floor(Math.random() * LENGTH));
    }

    return id;
}

function* idGenerator() {
    let ids = new Set();
    let i   = 0;
    
    // we can only create MAX_IDS ids
    while (++i < MAX_IDS) {
      let id = randomId();

      /*
       * the likelihood of this running n times is
       * (i / MAX_IDS) ^ n
       * to reduce the likelihood with large values of i
       * MAX_IDS could be subtracted by k, which would grant
       * ((MAX_IDS - k) * i / MAX_IDS ^ 2) ^ n
       * likelihood, but reduce the amount of ids by k
       */
      while (ids.has(id)) {
        id = randomId();
      }

      ids.add(id); 
      yield id;
    }
}

module.exports = idGenerator();
