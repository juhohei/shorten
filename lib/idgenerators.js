'use strict';

const CHARS     = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ';
const LENGTH    = CHARS.length;
const ID_LENGTH = 5;
const MAX_IDS   = Math.pow(LENGTH, ID_LENGTH); // ~916 million unique ids

function randomId() {
    let id = '';

    for (let i = 0; i < ID_LENGTH; ++i) {
        id += CHARS.charAt(Math.floor(Math.random() * LENGTH));
    }
    return id;
}

function decimalToBaseN(system) {
    let n = system.length;

    return function convert(dec) {
        if (dec >= n) {
            return convert(Math.floor(dec / n)) + system.charAt(dec % n);
        }
        return system.charAt(dec);
    };
}

exports.random = function* () {
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
};

exports.incremental = function* () {
    let i = 0;
    let convert = decimalToBaseN(CHARS);

    while (++i < MAX_IDS) {
        let id = convert(i);

        while (id.length < ID_LENGTH) {
          id = CHARS.charAt(0) + id;
        }
        yield id;
    }
};

