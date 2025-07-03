import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/registrar', async (req, res) => {
  const { nombres, cedula, correo, telefono, usuario, contrasena } = req.body;

  if (!correo.endsWith('@puce.edu.ec')) {
    return res.status(400).json({ mensaje: 'Correo debe tener el dominio @puce.edu.ec' });
  }

  try {
    const resultado = await db.query(
      'INSERT INTO usuarios (nombres, cedula, correo, telefono, usuario, contrasena) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombres, cedula, correo, telefono, usuario, contrasena]
    );
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: resultado.rows[0] });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el registro', error: err.message });
  }
});

export default router;