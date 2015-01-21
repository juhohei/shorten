'use strict';

var parse  = require('co-body');
var koa    = require('koa');
var serve  = require('koa-static');
var router = require('koa-route');
var app    = koa();

var checkUrl  = require('./lib/checkurl');
var Shortener = require('./lib/shortener');
var Short     = new Shortener();

const PORT = process.env.PORT || 3000;


app.use(serve(__dirname + '/public'));
app.use(router.get('/:id', redirect));
app.use(router.post('/shorten', shorten));


function* redirect(id) {
  let url = Short.getUrl(id);

  if (!url) return this.throw(`No URL for ID ${id}`, 404);

  this.status = 301;
  this.redirect(url);
  this.set('Content-Type', 'text/plain; charset=utf-8');
  this.body = url;
}


function* shorten() {
  let data = yield parse.form(this);
  let link = data.link;

  if (!link) return this.throw(`No parameter 'link' given`, 404);

  link = checkUrl(link);
  
  this.set('Content-Type', 'text/plain; charset=utf-8');
  this.body = Short.createOrFind(link);
}


app.listen(PORT);
console.log(`Listening to ${PORT}`);

