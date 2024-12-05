import express from 'express';
import fs from 'fs';
import cors from 'cors';
import net from 'net';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/save-settings', (request, result) => {
    try {
        const { name, settings } = request.body;
        const path = `./src/settings/${name}.json`;
        fs.writeFileSync(path, JSON.stringify(settings, null, 4));

        result.status(200).json({ message: 'Settings file updated' });
    } catch (error) {
        result.status(500).json({ error: error.message });
    }
});

function checkPort(port, callback) {
    const server = net.createServer();
    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            callback(false);
        } else {
            callback(err);
        }
    });
    server.once('listening', () => {
        server.close();
        callback(true);
    });
    server.listen(port);
}

function startServer(port) {
    checkPort(port, (isAvailable) => {
        if (isAvailable) {
            app.listen(port, () => {
                console.log(`Backend server running on port ${port}`);
            });
        } else {
            console.log(`Port ${port} is in use, trying port ${port + 1}`);
            startServer(port + 1);
        }
    });
}

startServer(PORT);

export default app;