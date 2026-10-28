const paginaConta = document.body.dataset.pagina;
if (paginaConta === 'login' || paginaConta === 'cadastro') {
  const formulario = document.getElementById('form-conta');
  formulario.addEventListener('submit',function (evento) {
    evento.preventDefault();
    const dados = new FormData(formulario);
    let erro = '';
    if (paginaConta === 'cadastro' && String(dados.get('name')).trim().length < 3) erro = 'Informe um nome com pelo menos 3 caracteres.';
    if (paginaConta === 'cadastro' && dados.get('password') !== dados.get('confirm')) erro = 'As senhas não coincidem.';
    document.getElementById('erro-conta').textContent = erro;
    document.getElementById('erro-conta').hidden = !erro;
    document.getElementById('sucesso-conta').hidden = true;
    if (erro) return;
    document.getElementById('sucesso-conta').textContent = 'Formulário validado. ' + (paginaConta === 'cadastro' ? 'Nenhuma conta foi criada.' : 'Nenhuma autenticação foi realizada.') + ' O backend ainda precisa ser conectado.';
    document.getElementById('sucesso-conta').hidden = false;
    formulario.reset();
  });
}
function mostrarPedidos() {
  const elemento = document.getElementById('lista-pedidos');
  if (!estado.orders.length) { elemento.innerHTML = estadoVazio('Nenhuma demonstração salva','Após testar o checkout, os produtos da demonstração aparecerão aqui.'); return; }
  let html = '<div class="order-list">';
  for (const pedido of estado.orders) {
    let itens = 0;
    for (const id in pedido.items) itens += pedido.items[id];
    html += '<article class="panel"><div class="section-heading"><h2>' + textoSeguro(pedido.id) + '</h2><span class="tag">Demonstração local</span></div><p>' + new Date(pedido.date).toLocaleDateString('pt-BR') + '</p><p>' + itens + ' itens · ' + moeda(pedido.totalCents) + '</p><a class="button secondary" href="/pedido.html?id=' + encodeURIComponent(pedido.id) + '">Ver detalhes</a></article>';
  }
  elemento.innerHTML = html + '</div>';
}
function mostrarDetalhesPedido() {
  const id = new URLSearchParams(window.location.search).get('id');
  const pedido = estado.orders.find(function (item) { return item.id === id; });
  const elemento = document.getElementById('detalhes-pedido');
  if (!pedido && id !== 'exemplo') { elemento.innerHTML = estadoVazio('Demonstração não encontrada','Consulte o histórico salvo neste navegador.'); return; }
  const etapas = ['Pedido realizado','Pagamento confirmado','Preparando pedido','Pedido enviado','Saiu para entrega','Entregue','Pedido cancelado','Aguardando pagamento'];
  elemento.innerHTML = '<div class="checkout-grid"><section class="panel"><h2>' + (pedido ? textoSeguro(pedido.id) : 'Exemplo de acompanhamento') + '</h2><p class="notice">As etapas abaixo explicam a interface futura. Selecioná-las não confirma pagamentos nem altera pedidos.</p>' + (pedido ? resumoPedido(pedido) : '') + '<h3 class="spaced">Entrega</h3><p>Endereço, frete, transportadora e rastreamento não foram processados.</p><a class="button outline" href="/trocas.html">Informações sobre trocas</a></section><section class="panel"><h2>Etapas do acompanhamento</h2><label>Conhecer um estado da interface<select id="etapa-pedido"></select></label><div class="timeline" id="linha-etapas"></div><p id="aviso-etapa" class="notice" hidden></p></section></div>';
  const seletor = document.getElementById('etapa-pedido');
  for (const etapa of etapas) seletor.add(new Option(etapa,etapa));
  function atualizar() {
    document.getElementById('linha-etapas').innerHTML = etapas.slice(0,6).map(function (etapa,i) { return '<div' + (seletor.value === etapa ? ' class="selected"' : '') + '><span>' + String(i + 1).padStart(2,'0') + '</span><div><strong>' + etapa + '</strong><small>Estado de referência · sem evento real</small></div></div>'; }).join('');
    document.getElementById('aviso-etapa').hidden = etapas.indexOf(seletor.value) < 6;
    document.getElementById('aviso-etapa').textContent = seletor.value + ': estado ilustrativo, sem alteração de uma compra.';
  }
  seletor.addEventListener('change',atualizar); atualizar();
}
if (paginaConta === 'pedidos') mostrarPedidos();
if (paginaConta === 'pedido') mostrarDetalhesPedido();
