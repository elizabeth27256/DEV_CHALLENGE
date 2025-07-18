import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import registroRuta from './routes/register.js';
import loginRuta from './routes/login.js';
import horariosRuta from './routes/schedules.js';
import coincidenciasRuta from './routes/coincidences.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});

// Rutas API
app.use('/api', registroRuta);
app.use('/api', loginRuta);
app.use('/api', horariosRuta);
app.use('/api/coincidences', coincidenciasRuta);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en https://dev-challenge-jxg9.onrender.com/api`);
});
