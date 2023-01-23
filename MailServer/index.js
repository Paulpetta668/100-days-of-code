const net = require('net');

const port = 25;
const backPort = 587;

var numConn = 0;

const server = net.createServer();
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const backServer = net.createServer();
backServer.listen(backPort, () => {
    console.log(`Backup server is listening on port ${backPort}`);
});

server.on('connection', (socket) => {
    numConn++;
    console.log('New connection from ' + socket.remoteAddress + ':' + socket.remotePort + ' - ' + numConn + ' total connections');
    console.log('Bytes received from client: ' + socket.bytesRead);

    socket.on("error", (err) => { console.log(err); }); // Ignore errors

    if(socket.bytesRead > 0) {
        socket.on("data", (data) => {
            console.log(`Data --> ${data}`);
        });
    }else{
        try{
            socket.write('220 \r');
            socket.pipe(socket);
            console.log('220 Sent!');
        }catch(err){
            console.log(err);
        }
    }
});