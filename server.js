const fastify = require('fastify')(/**{ logger: true }*/);
const fs = require('fs');
const path = require('path');

/*fastify.get('/scripts/client', async (_, res) => {
    const filePath = path.join(__dirname, 'client.js');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    res.type('text/javascript');
    return fileContent;
});*/

// Basit bir GET endpoint oluştur
fastify.get('/', async (request, reply) => {
  reply.type('text/html'); // Yanıtın tipini HTML olarak ayarla
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chainux APP</title>
        <script src="/public/client.js" type="module"></script>
    </head>
    <body>
        <div id="app"></div>
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
      reply.type('application/octet-stream');
      return fileContent;
    } catch (err) {
      reply.code(404).send('File not found');
    }
});

// Sunucuyu başlat
const start = async () => {
  try {
    await fastify.listen({port:3000});
    console.log('Sunucu http://localhost:3000 adresinde çalışıyor...');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
