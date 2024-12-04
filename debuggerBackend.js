import express from 'express';
import fs from 'fs';
import cors from 'cors';

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

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

export default app;