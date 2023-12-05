const express = require('express');
const server = express();
const dadosVendas = require('./data/dadosVendas.json');
const fs = require('fs');
server.use(express.json());
server.post('/vendas', (req, res) => {
    const novoVendas = req.body;
    if (!novoVendas.data || !novoVendas.id_medicamento || !novoVendas.id_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dadosVendas.Vendas.push(novoVendas);
        salvarDadosVendas(dadosVendas);
        return res.status(201).json({ mensagem: "Novo venda cadastrado com sucesso!" });
    }
});
server.get('/vendas', (req, res) => {
    return res.json(dadosVendas.Vendas);
});
server.put('/vendas/:id', (req, res) => {
    const vendasId = parseInt(req.params.id);
    const atualizarVendas = req.body;
    const idVendas = dadosVendas.Vendas.findIndex(f => f.id === vendasId);

    if (idVendas === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrado :/" });
    } else {
        dadosVendas.Vendas[idVendas].data = atualizarVendas.data || dadosVendas.Vendas[idVendas].data;
        dadosVendas.Vendas[idVendas].id_medicamento = atualizarVendas.id_medicamento || dadosVendas.Vendas[idVendas].id_medicamento;
        dadosVendas.Vendas[idVendas].id_cliente = atualizarVendas.id_cliente || dadosVendas.Vendas[idVendas].id_cliente;
        salvarDadosVendas(dadosVendas);
        return res.json({ mensagem: "Venda atualizado com sucesso!" });
    }
});
server.delete("/vendas/:id", (req, res) => {
    const vendasId = parseInt(req.params.id);
    dadosVendas.Vendas = dadosVendas.Vendas.filter(f => f.id !== vendasId);
    salvarDadosVendas(dadosVendas);
    return res.status(200).json({ mensagem: "Venda excluído com sucesso" });
});
function salvarDadosVendas() {
    fs.writeFileSync(__dirname + '/data/dadosVendas.json', JSON.stringify(dadosVendas, null, 2));
}
module.exports = { server, salvarDadosVendas };