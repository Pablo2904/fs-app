//KONFIGURACJA POŁĄCZEŃ Z BAZĄ DANYCH PostgreSQL

const { Pool } = require("pg");

// Create a pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
