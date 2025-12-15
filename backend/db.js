// Importa o Pool do PostgreSQL
const { Pool } = require('pg');

// Carrega as variáveis do arquivo .env
require('dotenv').config();

// Cria o pool de conexões com o banco PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,      // Endereço do banco no Render
  port: process.env.DB_PORT,      // Porta do banco (geralmente 5432)
  user: process.env.DB_USER,      // Usuário do banco
  password: process.env.DB_PASS,  // Senha do banco
  database: process.env.DB_NAME,  // Nome do banco
  ssl: {
    rejectUnauthorized: false     // Necessário no Render (SSL)
  }
});

// Exporta o pool para ser usado em outros arquivos
module.exports = pool;

