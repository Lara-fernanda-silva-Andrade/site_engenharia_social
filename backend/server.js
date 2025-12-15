const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

// ===============================
// CRIA A TABELA AUTOMATICAMENTE
// ===============================
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

// ===============================
// ROTAS
// ===============================

// Incrementa visitas
app.post('/visitas', async (req, res) => {
  try {
    await pool.query(
      'UPDATE visitas SET total = total + 1 WHERE id = 1'
    );

    const result = await pool.query(
      'SELECT total FROM visitas WHERE id = 1'
    );

    res.json({ total: result.rows[0].total });
  } catch (err) {
    console.error('Erro no POST /visitas:', err);
    res.status(500).json({ erro: 'Erro ao registrar visita' });
  }
});

// Consulta visitas
app.get('/visitas', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT total FROM visitas WHERE id = 1'
    );

    res.json({ total: result.rows[0].total });
  } catch (err) {
    console.error('Erro no GET /visitas:', err);
    res.status(500).json({ erro: 'Erro ao buscar visitas' });
  }
});

// ===============================
// INICIA SERVIDOR
// ===============================
const PORT = process.env.PORT || 3000;

criarTabelaVisitas();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
