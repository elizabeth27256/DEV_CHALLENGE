import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import registroRuta from '../backend/register.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', registroRuta);

app.listen(3000, () => {
  console.log('Servidor inicializado en http://localhost:3000');
});