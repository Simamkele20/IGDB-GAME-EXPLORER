import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { gameRouter } from './controller/GameController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './static')));
app.use('/games', gameRouter)
app.get('^/$|/game', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
