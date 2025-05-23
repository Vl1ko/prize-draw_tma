const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const port = 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cors = require('cors');

const httpsOptions = {
  key: fs.readFileSync('./.cert/key.pem'),
  cert: fs.readFileSync('./.cert/cert.pem'),
};

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log('ready - started server on url: http://localhost:' + port);
  });
});
