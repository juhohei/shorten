'use strict';

var fs = require('fs');

var Shortener = function Shortener(idGenerator) {
    this.db  = require('../.db.json');
    this.gen = idGenerator();
};

Shortener.prototype.createOrFind = function (url, custom) {
    let id = custom || this.gen.next().value;
    if (!this.db[url] && !this.db[id]) {
        this.db[url] = id;
        this.db[id]  = url;
        fs.writeFile('.db.json', JSON.stringify(this.db), function (err) {
            if (err) return console.error(err);
        });
        return id;
    }
    id = this.db[url];
    return id;
};

Shortener.prototype.getUrl = function (id) {
    let url = this.db[id];
    if (!url) return false;
    return url;
};

Shortener.prototype.getId = function (url) {
    let id = this.db[url];
    if (!id) return false;
    return id;
};

module.exports = Shortener;

