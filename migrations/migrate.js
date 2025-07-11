import fs from 'fs';
import db from '../backend/db.js';
await db.query(fs.readFileSync('migrations/001_init.sql').toString());
console.log('✔ Migración aplicada');
process.exit();