const settings=require("./settings")
const server=settings.SERVER
const api=settings.API
const fastify = require('fastify')({logger:server.logger??0});
const fs = require('fs');
const path = require('path');
const S=require("./socket");

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
        <script src="/public/client.min.js" type="module"></script>
        <script src="/public/client.io.js" type="module"></script>
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

fastify.get('/assets/*', async (request, reply) => {
    const filePath = path.join(__dirname,"public", request.raw.url);
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


  /*    API     */
  fastify.get("/api/*", async (req, rep) => {
    const apiPath = req.params['*'];
    const modulePath = path.join(__dirname, 'server', 'api', apiPath, 'index.js');  // Dinamik olarak dosya yolu oluştur

    if (api.state&&fs.existsSync(modulePath)) {
      const module = require(modulePath);
      return module.GET(req, rep);
    } else {
      return api.error(req,rep,"GET",api.state)
    }
  });

  fastify.post("/api/*", async (req, rep) => {
    const apiPath = req.params['*'];
    const modulePath = path.join(__dirname, 'server', 'api', apiPath, 'index.js');

    if (api.state&&fs.existsSync(modulePath)) {
      const module = require(modulePath);
      return module.POST(req, rep);
    } else {
        return api.error(req,rep,"POST",api.state)
    }
  });

  fastify.delete("/api/*", async (req, rep) => {
    const apiPath = req.params['*'];
    const modulePath = path.join(__dirname, 'server', 'api', apiPath, 'index.js');

    if (api.state&&fs.existsSync(modulePath)) {
      const module = require(modulePath);
      return module.DELETE(req, rep);
    } else {
        return api.error(req,rep,"DELETE",api.state)
    }
  });

  fastify.put("/api/*", async (req, rep) => {
    const apiPath = req.params['*'];
    const modulePath = path.join(__dirname, 'server', 'api', apiPath, 'index.js');
    if (api.state&&fs.existsSync(modulePath)) {
      const module = require(modulePath);
      return module.PUT(req, rep);
    } else {
        return api.error(req,rep,"PUT",api.state)
    }
  });

// Sunucuyu başlat
const start = async () => {
    let SERVER
try {
    let port=server.port??3000
    SERVER=await fastify.listen({port});
    console.log('Chainux Server Started!: http://localhost:'+port);
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
return SERVER
};
fastify.server.on('upgrade', (request, socket, head) => {
  const {wss}=S
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

start()

//socket.setServer(currentServer)

//
/*
let db=require("lmdb")
let userdb=db.open({
    path:"db-usernames",
    compression:1
})*/
/*
function registerUser(name,arg){
    userdb.transaction(()=>{
        userdb.put(name,{...arg})
        console.log(userdb.get(name))
    })
}
registerUser("admin",{
    yetenek:1,
    hello:"sadsa"
})
registerUser("admin1",{
    yetenek:1,
    hello:"sadsas"
})
console.log(Object.keys(userdb))*/