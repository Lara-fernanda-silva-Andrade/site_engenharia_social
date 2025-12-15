const express = require('express');
const cors = require('cors');
const pool = require('./db'); // 👈 usa o db.js

const app = express();

app.use(express.json());
app.use(cors());

// Cria a tabela automaticamente
async function criarTabelaVisitas() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitas (
        id INTEGER PRIMARY KEY,
        total BIGINT NOT NULL DEFAULT 0
      )
    `);

    await pool.query(`
      INSERT INTO visitas (id, total)
      VALUES (1, 0)
      ON CONFLICT (id) DO NOTHING
    `);

    console.log('✅ Tabela visitas pronta.');
  } catch (err) {
  console.error('❌ Erro ao criar tabela visitas (erro completo):');
  console.error(err);
}

}

const PORT = process.env.PORT || 3000;

criarTabelaVisitas();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
