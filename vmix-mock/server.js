
const net = require('node:net');

const server = net.createServer((socket) => {
    console.log('vMix client connected');

    let buffer = '';

    socket.on('data', (data) => {
        buffer += data.toString();

        let index;
        while ((index = buffer.indexOf('\r\n')) !== -1) {
            const command = buffer.slice(0, index);
            buffer = buffer.slice(index + 2);

            if (!command.trim()) continue;

            console.log('[MOCK VMIX]', command);

            if (command.startsWith('FUNCTION ')) {
                socket.write('FUNCTION OK Completed\r\n');
            } else {
                socket.write('UNKNOWN ER Unsupported\r\n');
            }
        }
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});

server.listen(8099, '0.0.0.0', () => {
    console.log('Mock vMix listening on port 8099');
});
