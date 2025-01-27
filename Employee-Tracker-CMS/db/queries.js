const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  user: 'postgres', // Replace with your actual PostgreSQL username
  host: 'localhost',
  database: 'employee_tracker_cms', // Replace with your actual database name
  password: 'admin123', // Replace with your actual PostgreSQL password
  port: 5432,
});

client.connect();

const loadQuery = (filename) => {
  const filePath = path.join(__dirname, filename);
  return fs.readFileSync(filePath, 'utf8');
};

const executeQuery = (query, params = []) => {
  return client.query(query, params);
};

module.exports = {
  loadQuery,
  executeQuery,
  client
};