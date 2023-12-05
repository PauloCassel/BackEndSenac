const express = require('express');
const server = express();
const clientesRouter = require('./controllerClientes.js');
const medicamentosRouter = require('./controllerMedicamentos.js')
const fornecedoresRouter = require('./controllerFornecedores.js')
const vendasRouter = require('./controllerVendas.js')
const cors = require('cors');
const fs = require('fs');

server.use(express.json());
server.use(cors());

server.use('/api', clientesRouter.server);
server.use('/api', medicamentosRouter.server);
server.use('/api', fornecedoresRouter.server);
server.use('/api', vendasRouter.server)

server.listen(3000, () => {
    console.log('O servidor está funcionando! :D');
});
