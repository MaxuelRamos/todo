const fs = require('fs');
const async = require('async');
const pg = require('pg');
const Hoek = require('hoek');
const path = require('path');

const databaseUrl = 'postgres://ponto:ponto@admin@localhost:5432/ponto';
const client = new pg.Client(databaseUrl);

const query = `
   drop schema  ponto cascade;
CREATE SCHEMA ponto AUTHORIZATION ponto;`;

console.log('Clean started');

const clean = async () => {
  await client.connect();
  console.log('Connected');
  await client.query(query);
  console.log('Clean Successfull.');
  process.exit();
};

clean();

// client.query(query, () => {
//   console.log('Limpado com sucesso.');

// });
