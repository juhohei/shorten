shorten
===

Shorten is an `io.js` URL shortener powered by `koa.js`. It uses in-memory database (see [adding database](#adding-database) for persistent memory).

installation
---

You need to have `io.js` installed. See [iojs.org](https://iojs.org) for installation.

    $ git clone https://github.com/juhohei/shorten.git
    $ cd shorten
    $ npm install

usage
---

    $ npm start       # or
    $ iojs index.js   # or
    $ node index.js   # symlinked on io.js install


You can specify a port to run the server on (default 3000):

    $ PORT=8080 iojs index.js
    $ sudo PORT=80 iojs index.js

Then navigate to `http://localhost:PORT` to use the GUI. Alternatively, you can use tools such as `curl` (see [api](#api)). The GUI probably doesn't work on IE (at least older versions).

api
---

**POST /shorten**  
**Parameters**: link (the link to shorten), if there's no protocol http:// is assumed.  
**Returns**: id for the shortened link (text/plain)  
**curl example**: `curl -d 'link=example.com' localhost:3000/shorten`


**GET /:id**  
**Redirects (GUI)**: to previously stored URL, 404's if there's no link with given id  
**OR**  
**Returns (CLI)**: previously stored URL (text/plain), 'No URL for ID $id' if there's no link with given id  
**curl example**: `curl localhost:3000/id`

Use `-i` option with `curl` to see the headers.

adding database
---

TODO

other
---

The ids consist of 5 [a-zA-Z0-9]. They are generated randomly. See [idgenerator](lib/idgenerator.js) for comments. Some sites, such as [ow.ly](http://ow.ly), seem to increment their id by one for each request (eg. AAAAA -> AAAAB -> AAAAC). That is a faster and more robust way; it prevents id collisions. Other sites, such as [goo.gl](http://goo.gl), seem to either use some kind of hash algorithm or generate random sequences.

license
---

MIT
