const fastify = require('fastify')({ logger: true });
const fs = require('fs');
const path = require('path');

fastify.get('/scripts/client', async (_, res) => {
    const filePath = path.join(__dirname, 'client.js');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    res.type('text/javascript');
    return fileContent;
});

// Basit bir GET endpoint oluştur
fastify.get('/', async (request, reply) => {
  reply.type('text/html'); // Yanıtın tipini HTML olarak ayarla
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fastify HTML Render</title>
        <script src="/scripts/client"></script>
    </head>
    <body>
        <h1>Merhaba, Fastify!</h1>
        <p>Bu, Fastify ile render edilen bir HTML sayfasıdır.</p>
    </body>
    </html>
  `; // Dönmek istediğin HTML içeriğini yaz
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
