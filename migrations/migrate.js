import fs from 'fs';
import db from '../backend/db.js';
await db.query(
  fs.readFileSync('migrations/001_init.sql', 'utf8')
);
console.log('✔ Migración aplicada');
process.exit();