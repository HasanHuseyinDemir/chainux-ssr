function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = (c === 'x' ? r : (r & 0x3 | 0x8));
      return v.toString(16);
    });
}
const userUUID = generateUUID();
let socket
function connect(){//also reconnect
    socket=new WebSocket('ws://localhost:3000');
    socket.addEventListener('open', function (event) {
        console.log("Hello")
    });
    
    socket.addEventListener('message', function (event) {
        console.log(event)
    });
    
    socket.addEventListener('close', function (event) {
        console.log("Connecting...")
        reconnect()
    });
    
    socket.addEventListener('error', function (event) {
        console.error('WebSocket error:', event);
        reconnect()
    });
}
function reconnect(){
    setTimeout(connect,5000)
}
connect()



