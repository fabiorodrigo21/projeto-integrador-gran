const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./banco.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT, descricao TEXT, preco REAL, codigo_barras TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT, cnpj TEXT, endereco TEXT, contato TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS associacoes (
    produto_id INTEGER, fornecedor_id INTEGER,
    FOREIGN KEY(produto_id) REFERENCES produtos(id),
    FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id)
  )`);
});
module.exports = db;
