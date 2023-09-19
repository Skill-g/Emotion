import cors from 'cors';
import express from 'express';
import db from './db.js';
import routes from './routes.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

routes(app, db);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));