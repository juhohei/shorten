'use strict';

const idGenerator = require('./idgenerator');

var Shortener = function Shortener() {
  this.ids    = new Map();
  this.urls   = new Map();
  this.gen    = idGenerator;
  this.latest = null;
};

Shortener.prototype.shorten = function (url) {
  if (!this.urls.has(url)) {
    let id = this.gen.next().value;
    this.ids.set(id, url);
    this.urls.set(url, id);
    this.latest = id;
    return id;
  }
  let id = this.latest = this.urls.get(url);
  return id;
};

Shortener.prototype.getUrl = function (id) {
  let url = this.ids.get(id);
  if (!url) return false;
  return url;
};

Shortener.prototype.getId = function (url) {
  let id = this.urls.get(url);
  if (!id) return false;
  return id;
};

Shortener.prototype.getLatest = function () {
  return this.latest;
};

Shortener.prototype.clearLatest = function () {
  this.latest = null;
};

module.exports = Shortener;
