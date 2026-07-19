import React, { useState, useEffect } from 'react';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  
  const carregarDados = () => {
    fetch('http://localhost:3000/produtos').then(res => res.json()).then(setProdutos).catch(()=>console.log("Erro ao buscar produtos"));
    fetch('http://localhost:3000/fornecedores').then(res => res.json()).then(setFornecedores).catch(()=>console.log("Erro ao buscar fornecedores"));
  };

  useEffect(() => { carregarDados(); }, []);

  const addProduto = (e) => {
    e.preventDefault();
    const dados = {
      nome: e.target.nome.value, descricao: e.target.descricao.value,
      preco: e.target.preco.value, codigo_barras: e.target.codigo.value
    };
    fetch('http://localhost:3000/produtos', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados)
    }).then(() => { carregarDados(); e.target.reset(); });
  };

  const addFornecedor = (e) => {
    e.preventDefault();
    const dados = {
      nome: e.target.nome.value, cnpj: e.target.cnpj.value,
      endereco: e.target.endereco.value, contato: e.target.contato.value
    };
    fetch('http://localhost:3000/fornecedores', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados)
    }).then(() => { carregarDados(); e.target.reset(); });
  };

  const associar = (e) => {
    e.preventDefault();
    const dados = {
      produto_id: e.target.produto.value, fornecedor_id: e.target.fornecedor.value
    };
    fetch('http://localhost:3000/associar', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados)
    }).then(() => alert('Associado com sucesso!'));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Projeto Integrador Fullstack - Gran Faculdade</h1>
      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        <div style={{flex: 1, minWidth: '300px'}}>
          <h2>1. Produtos</h2>
          <form onSubmit={addProduto}>
            <input name="nome" placeholder="Nome" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <input name="descricao" placeholder="Descrição" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <input name="preco" type="number" step="0.01" placeholder="Preço" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <input name="codigo" placeholder="Cód. Barras" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <button type="submit" style={{width: '100%'}}>Cadastrar Produto</button>
          </form>
          <ul>{produtos.map(p => <li key={p.id}>{p.nome} - R$ {p.preco}</li>)}</ul>
        </div>
        <div style={{flex: 1, minWidth: '300px'}}>
          <h2>2. Fornecedores</h2>
          <form onSubmit={addFornecedor}>
            <input name="nome" placeholder="Nome" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <input name="cnpj" placeholder="CNPJ" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <input name="endereco" placeholder="Endereço" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <input name="contato" placeholder="Contato" required style={{marginBottom: 5, width: '100%'}}/><br/>
            <button type="submit" style={{width: '100%'}}>Cadastrar Fornecedor</button>
          </form>
          <ul>{fornecedores.map(f => <li key={f.id}>{f.nome} (CNPJ: {f.cnpj})</li>)}</ul>
        </div>
        <div style={{flex: 1, minWidth: '300px'}}>
          <h2>3. Associação (Produto/Fornecedor)</h2>
          <form onSubmit={associar}>
            <select name="produto" required style={{marginBottom: 5, width: '100%'}}>
              <option value="">Selecione um Produto</option>
              {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select><br/>
            <select name="fornecedor" required style={{marginBottom: 5, width: '100%'}}>
              <option value="">Selecione um Fornecedor</option>
              {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
            </select><br/>
            <button type="submit" style={{width: '100%'}}>Associar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
