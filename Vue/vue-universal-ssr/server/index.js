require("dotenv").config();

const express = require('express');
const path = require('path');
const server = express();
const template = require('fs').readFileSync('./server/template.html', 'utf-8');
const serverBundler = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const { createBundleRenderer } = require('vue-server-renderer');
const renderer = createBundleRenderer(serverBundler, {
    runInNewContext: false,
    template,
    clientManifest
});

const pathResolve = file => path.resolve(__dirname, file);
const serve = (urlPath, cache) => express.static(pathResolve(urlPath), { maxAge: cache ? 60 * 60 * 24 * 30 : 0 });

server.use('/img', serve('../dist/img', true));
server.use('/js', serve('../dist/js', true));

server.get('*', (req, res) => {
    const context = { url: req.url };

    renderer.renderToString(context, (err, html) => {
        if(err){
            const errCode = err.code === 404 ? 404 : 500;
            res.status(errCode).sendFile(pathResolve(`${errCode}.html`));
        }else {
            res.header('Content-Type', 'text/html');
            res.end(html);
        }
    })
});

server.post('*', (req, res) => {
    res.status(500).sendFile(pathResolve('500.html'));
});

server.listen(3000, () => {
    console.log('server started at port 3000');
});


