const express = require('express');
const cors = require('cors');

// Pool do PostgreSQL usando variáveis do Render
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const app = express();

app.use(express.json());
app.use(cors());

// Cria a tabela visitas automaticamente ao iniciar o servidor
async function criarTabelaVisitas() {
  try {
    // Cria a tabela se ela ainda não existir
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitas (
        id INTEGER PRIMARY KEY,
        total BIGINT NOT NULL DEFAULT 0
      )
    `);

    // Garante que exista a linha inicial (id = 1)
    await pool.query(`
      INSERT INTO visitas (id, total)
      VALUES (1, 0)
      ON CONFLICT (id) DO NOTHING
    `);

    console.log('Tabela visitas pronta.');
  } catch (err) {
    console.error('Erro ao criar tabela visitas:', err);
  }
}

// Inicializa o servidor
const PORT = process.env.PORT || 3000;

criarTabelaVisitas();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
