const express = require('express');
// const mysql = require('mysql2/promise');
const cors = require('cors');
const pool = require('./db'); 

require('dotenv').config();

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




// Pool de conexões com o MySQL
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// Rota raiz apenas para teste
app.get('/', (req, res) => {
  res.send('Backend rodando. Use /visitas (GET ou POST).');
});



app.get('/visitas', async (req, res) => {
  try {
    // Executa a consulta no PostgreSQL
    const result = await pool.query(
      'SELECT total FROM visitas WHERE id = 1'
    );

    // Se não existir registro, retorna 0
    if (result.rows.length === 0) {
      return res.json({ total: 0 });
    }

    // Retorna o total encontrado
    res.json({ total: result.rows[0].total });
  } catch (err) {
    console.error('Erro GET /visitas:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});


app.post('/visitas', async (req, res) => {
  try {
    // Incrementa o contador
    await pool.query(
      'UPDATE visitas SET total = total + 1 WHERE id = 1'
    );

    // Busca o valor atualizado
    const result = await pool.query(
      'SELECT total FROM visitas WHERE id = 1'
    );

    // Retorna o novo total
    res.json({ total: result.rows[0].total });
  } catch (err) {
    console.error('Erro POST /visitas:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});



// Inicializa o servidor
const PORT = process.env.PORT || 3000;
criarTabelaVisitas();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


// require('dotenv').config();
// const express = require('express');
// const { conectar, desconectar } = require('./db');

// const app = express();
// const PORT = process.env.PORT || 3000;

// async function testarConexao() {
//     try {
//         const conexao = await conectar();
//         console.log('Conectado ao banco com sucesso!');
//         await desconectar(conexao);
//         console.log('Conexão encerrada.');
//     } catch (erro) {
//         console.error('Erro ao conectar no banco:', erro.message);
//     }
// }

// testarConexao();

// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });
