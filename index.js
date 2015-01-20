'use strict';

const parse   = require('co-body');
const koa     = require('koa');
const serve   = require('koa-static');
const router  = require('koa-route');
const app     = koa();

const Shortener = require('./lib/shortener');
const Short     = new Shortener();

const PORT = process.env.PORT || 3000;


app.use(serve(__dirname + '/public'));
app.use(router.get('/:id', redirect));
app.use(router.post('/shorten', shorten));


function* redirect(id) {
  let url = Short.getUrl(id);

  if (!url) return this.throw(`No URL for ID ${id}`, 404);

  this.status = 301;
  this.redirect(url);
  this.response.body = url;
}


function* shorten() {
  let data = yield parse.form(this);

  if (!data.link) return this.throw(`No parameter 'link' given`, 404);

  this.set('Content-Type', 'text/plain');
  this.set('charset', 'utf-8');
  this.body = Short.shorten(data.link);
}


app.listen(PORT);
console.log(`Listening to ${PORT}`);

