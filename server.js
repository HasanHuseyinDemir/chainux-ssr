const logger={
    logger:false//customizable
}
const fastify = require('fastify')(logger);
const fs = require('fs');
const path = require('path');

fastify.get('/*', async (r, reply) => {
  reply.type('text/html');
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chainux APP</title>
        <link rel="icon" href="/assets/favicon.png" type="image/x-icon">
        <link rel="stylesheet" href="/assets/styles/index.css">
        <script src="/public/client/client.js" type="module"></script>
    </head>
    <body>
        <main id="app"></main>
        <noscript>
            <p>Your browser does not support JavaScript or it is disabled. Please enable JavaScript for the best experience on this site.</p>
        </noscript>
    </body>
    </html>
  `;
});

fastify.get('/public/*', async (request, reply) => {
    const filePath = path.join(__dirname, request.raw.url);
    try {
      const fileContent = fs.readFileSync(filePath);
      const extname = path.extname(filePath).toLowerCase();
      switch (extname) {
        case '.js':reply.type('application/javascript');break;
        case '.html':reply.type('text/html');break;
        default:reply.type('text/plain');
    }
        return fileContent;
    } catch (err) {
    reply.code(404).send('File not found');
    }
});

fastify.get('/store/*', async (request, reply) => {
    const filePath = path.join(__dirname, request.raw.url);
    try {
      const fileContent = fs.readFileSync(filePath);
      const extname = path.extname(filePath).toLowerCase();
      switch (extname) {
        case '.js':reply.type('application/javascript');break;
    }
        return fileContent;
    } catch (err) {
    reply.code(404).send('File not found');
    }
});

fastify.get('/assets/*', async (request, reply) => {
    const filePath = path.join(__dirname, request.raw.url);
    try {
        const fileContent = fs.readFileSync(filePath);
        const extname = path.extname(filePath).toLowerCase();
        
        switch (extname) {
            case '.css':
                reply.type('text/css');
                break;
            case '.jpg':
            case '.jpeg':
                reply.type('image/jpeg');
                break;
            case '.png':
                reply.type('image/png');
                break;
            case '.gif':
                reply.type('image/gif');
                break;
            case '.svg':
                reply.type('image/svg+xml');
                break;
            default:
                reply.type('text/plain');
        }
        return fileContent;
    } catch (err) {
        reply.code(404).send('File not found');
    }
});

// Sunucuyu başlat
const start = async () => {
try {
    await fastify.listen({port:3000});
    console.log('Chainux Server Started!: http://localhost:3000');
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}};

start();
