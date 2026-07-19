const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Produtos
app.get('/produtos', (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => res.json(rows));
});
app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, codigo_barras } = req.body;
  db.run(`INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)`, 
    [nome, descricao, preco, codigo_barras], function(err) {
      res.json({ id: this.lastID, ...req.body });
  });
});

// Fornecedores
app.get('/fornecedores', (req, res) => {
  db.all("SELECT * FROM fornecedores", [], (err, rows) => res.json(rows));
});
app.post('/fornecedores', (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;
  db.run(`INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)`, 
    [nome, cnpj, endereco, contato], function(err) {
      res.json({ id: this.lastID, ...req.body });
  });
});

// Associacao
app.post('/associar', (req, res) => {
  const { produto_id, fornecedor_id } = req.body;
  db.run(`INSERT INTO associacoes (produto_id, fornecedor_id) VALUES (?, ?)`, 
    [produto_id, fornecedor_id], function(err) {
      res.json({ message: "Associação criada com sucesso!" });
  });
});
app.get('/fornecedor/:id/produtos', (req, res) => {
  const sql = `SELECT p.* FROM produtos p INNER JOIN associacoes a ON p.id = a.produto_id WHERE a.fornecedor_id = ?`;
  db.all(sql, [req.params.id], (err, rows) => res.json(rows));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}/`));
