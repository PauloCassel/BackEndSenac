const express = require('express');
const server = express();
const dadosFornecedores = require('./data/dadosFornecedores.json');
const fs = require('fs');
server.use(express.json());
server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;
    if (!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dadosFornecedores.Fornecedores.push(novoFornecedor);
        salvarDadosFornecedores(dadosFornecedores);
        return res.status(201).json({ mensagem: "Novo fornecedor cadastrado com sucesso!" });
    }
});
server.get('/fornecedores', (req, res) => {
    return res.json(dadosFornecedores.Fornecedores);
});
server.put('/fornecedores/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    const atualizarFornecedor = req.body;
    const idFornecedor = dadosFornecedores.Fornecedores.findIndex(f => f.id === fornecedorId);

    if (idFornecedor === -1) {
        return res.status(404).json({ mensagem: "Fornecedores não encontrado :/" });
    } else {
        dadosFornecedores.Fornecedores[idFornecedor].nome = atualizarFornecedor.nome || dadosFornecedores.Fornecedores[idFornecedor].nome;
        dadosFornecedores.Fornecedores[idFornecedor].endereco = atualizarFornecedor.endereco || dadosFornecedores.Fornecedores[idFornecedor].endereco;
        dadosFornecedores.Fornecedores[idFornecedor].telefone = atualizarFornecedor.telefone || dadosFornecedores.Fornecedores[idFornecedor].telefone;
        salvarDadosFornecedores(dadosFornecedores);
        return res.json({ mensagem: "Fornecedor atualizado com sucesso!" });
    }
});
server.delete("/fornecedores/:id", (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    dadosFornecedores.Fornecedores = dadosFornecedores.Fornecedores.filter(f => f.id !== fornecedorId);
    salvarDadosFornecedores(dadosFornecedores);
    return res.status(200).json({ mensagem: "Fornecedores excluído com sucesso" });
});
function salvarDadosFornecedores() {
    fs.writeFileSync(__dirname + '/data/dadosFornecedores.json', JSON.stringify(dadosFornecedores, null, 2));
}
module.exports = { server, salvarDadosFornecedores };