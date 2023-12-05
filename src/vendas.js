document.addEventListener('DOMContentLoaded', function () {
    loadVendasList();
    document.getElementById('formAdicionarVendas').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarVendas();
    });
});
function adicionarVendas() {
    const data = document.getElementById('dataVendas').value;
    const id_medicamento = document.getElementById('id_MedicamentoVendas').value;
    const id_cliente = document.getElementById('id_ClienteVendas').value;
    fetch('http://localhost:3000/api/vendas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: data,
            id_medicamento: id_medicamento,
            id_cliente: id_cliente,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadVendasList();
        })
        .catch(error => console.error('Error:', error));
}
function loadVendasList() {
    fetch('http://localhost:3000/api/vendas')
        .then(response => response.json())
        .then(data => displayVendasList(data))
        .catch(error => console.error('Error:', error));
}
function displayVendasList(data) {
    const listaVendas = document.getElementById('listaVendas');
    listaVendas.innerHTML = '';
    data.forEach(vendas => {
        const listItem = document.createElement('li');
        listItem.textContent = `Data: ${vendas.data} - ID do Medicamento: ${vendas.id_medicamento} - ID do Cliente: ${vendas.id_cliente}`
        listaVendas.appendChild(listItem);
    });
}
