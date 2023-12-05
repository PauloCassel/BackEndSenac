document.addEventListener('DOMContentLoaded', function () {
    loadFornecedoresList();
    document.getElementById('formAdicionarFornecedor').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarFornecedor();
    });
});
function adicionarFornecedor() {
    const nome = document.getElementById('nomeFornecedor').value;
    const endereco = document.getElementById('enderecoFornecedor').value;
    const telefone = document.getElementById('telefoneFornecedor').value;
    fetch('http://localhost:3000/api/fornecedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            endereco: endereco,
            telefone: telefone,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadFornecedoresList();
        })
        .catch(error => console.error('Error:', error));
}
function loadFornecedoresList() {
    fetch('http://localhost:3000/api/fornecedores')
        .then(response => response.json())
        .then(data => displayFornecedoresList(data))
        .catch(error => console.error('Error:', error));
}
function displayFornecedoresList(data) {
    const listaFornecedores = document.getElementById('listaFornecedores');
    listaFornecedores.innerHTML = '';
    data.forEach(fornecedores => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nome: ${fornecedores.nome} - Endereço: ${fornecedores.endereco} - Telefone: ${fornecedores.telefone}`
        listaFornecedores.appendChild(listItem);
    });
}
