const express = require('express');
const server = express();
const dadosMedicamentos = require('./data/dadosMedicamentos.json');
const fs = require('fs');
server.use(express.json());
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body;
    if (!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dadosMedicamentos.Medicamentos.push(novoMedicamento);
        salvarDadosMedicamentos(dadosMedicamentos);
        return res.status(201).json({ mensagem: "Novo medicamento cadastrado com sucesso!" });
    }
});
server.get('/medicamentos', (req, res) => {
    return res.json(dadosMedicamentos.Medicamentos);
});
server.put('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    const atualizarMedicamentos = req.body;
    const idMedicamento = dadosMedicamentos.Medicamentos.findIndex(m => m.id === medicamentoId);

    if (idMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado :/" });
    } else {
        dadosMedicamentos.Medicamentos[idMedicamento].nome = atualizarMedicamentos.nome || dadosMedicamentos.Medicamentos[idMedicamento].nome;
        dadosMedicamentos.Medicamentos[idMedicamento].fabricante = atualizarMedicamentos.fabricante || dadosMedicamentos.Medicamentos[idMedicamento].fabricante;
        dadosMedicamentos.Medicamentos[idMedicamento].preco = atualizarMedicamentos.preco || dadosMedicamentos.Medicamentos[idMedicamento].preco;
        dadosMedicamentos.Medicamentos[idMedicamento].quantidade = atualizarMedicamentos.quantidade || dadosMedicamentos.Medicamentos[idMedicamento].quantidade;
        salvarDadosMedicamentos(dadosMedicamentos);
        return res.json({ mensagem: "Medicamento atualizado com sucesso!" });
    }
});
server.delete("/medicamentos/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    dadosMedicamentos.Medicamentos = dadosMedicamentos.Medicamentos.filter(m => m.id !== medicamentoId);
    salvarDadosMedicamentos(dadosMedicamentos);
    return res.status(200).json({ mensagem: "Medicamento excluído com sucesso" });
});
function salvarDadosMedicamentos() {
    fs.writeFileSync(__dirname + '/data/dadosMedicamentos.json', JSON.stringify(dadosMedicamentos, null, 2));
}
module.exports = { server, salvarDadosMedicamentos };