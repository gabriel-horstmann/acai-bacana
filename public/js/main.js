/* JavaScript FrontEnd */
const serverURL = 'http://localhost:3000/api/pedidos';
async function loadData(){
  const firstContainer = document.getElementById('content-list');
  const requestResult = await fetch(serverURL);
  const objects = await requestResult.json();
  objects.forEach(object => {
    let mainList = document.createElement('div');
    mainList.className = 'list-column';
    firstContainer.appendChild(mainList);
    let orderNumber = document.createElement('div');
    orderNumber.className = 'frame-content';
    orderNumber.innerHTML = object.id_pedido;
    let orderDate = document.createElement('div');
    orderDate.className = 'frame-content';
    orderDate.innerHTML = object.updated_at;
    let clientName = document.createElement('div');
    clientName.className = 'frame-content';
    clientName.innerHTML = object.cliente;
    let orderSquare = document.createElement('div');
    orderSquare.className = 'order-detail'; 
    mainList.appendChild(orderSquare);
    let orderType = document.createElement('div');
    orderType.className = 'frame-content';
    orderType.innerHTML = object.itens;
    let orderView = document.createElement('div');                                                                                                                                                                                
  });
}