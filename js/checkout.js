// Revisão, pagamento e confirmação são demonstrações locais, sem transação real.
let checkoutEmRevisao = false;
let checkoutConcluindo = false;
let clienteCheckout = null;

function selecaoCheckout() {
  const selecionado = document.querySelector('input[name="payment"]:checked');
  return { method: selecionado ? selecionado.value : '', installments: Number(document.getElementById('parcelas').value) || 1 };
}
function atualizarResumoCheckout() {
  const vazio = !Object.keys(estado.cart).length;
  document.getElementById('checkout-vazio').hidden = !vazio;
  document.getElementById('fluxo-checkout').hidden = vazio;
  if (vazio) { document.getElementById('checkout-vazio').innerHTML = estadoVazio('Adicione produtos antes de continuar'); return; }
  let itens = '';
  for (const id in estado.cart) {
    const produto = buscarProduto(id);
    itens += '<div class="summary-item"><strong>' + textoSeguro(produto.name) + '</strong><p>' + estado.cart[id] + ' × ' + moeda(produto.priceCents) + '</p></div>';
  }
  document.getElementById('resumo-produtos').innerHTML = itens;
  const selecao = selecaoCheckout();
  const pagamento = calcularPagamento(somarCarrinho(estado.cart),selecao.method,selecao.installments);
  document.getElementById('resumo-valores').innerHTML = '<p>Subtotal: <strong>' + moeda(pagamento.subtotalCents) + '</strong></p>' + (pagamento.discountCents ? '<p>Desconto Pix de exemplo: −' + moeda(pagamento.discountCents) + '</p>' : '') + '<h3>Total da demonstração</h3><strong class="detail-price">' + moeda(pagamento.totalCents) + '</strong>' + (selecao.method ? '<p class="muted">' + nomesPagamento[selecao.method] + ' · ' + descreverParcelas(pagamento.amounts) + '</p>' : '');
  document.getElementById('campo-parcelamento').hidden = selecao.method !== 'credit';
  for (const radio of document.querySelectorAll('input[name="payment"]')) radio.closest('label').classList.toggle('chosen',radio.checked);
  const previa = document.getElementById('previa-pagamento');
  previa.hidden = !selecao.method;
  let parcelas = '';
  if (selecao.method === 'credit' && pagamento.amounts.length > 1) {
    parcelas = '<ol class="installment-list">';
    for (let i = 0; i < pagamento.amounts.length; i++) parcelas += '<li>Parcela ' + (i + 1) + ': ' + moeda(pagamento.amounts[i]) + '</li>';
    parcelas += '</ol>';
  }
  previa.innerHTML = '<strong>' + nomesPagamento[pagamento.method] + ' · simulação</strong><p>' + descreverParcelas(pagamento.amounts) + '</p>' + parcelas + (selecao.method === 'pix' ? '<p>Desconto de exemplo: ' + moeda(pagamento.discountCents) + '. Nenhuma chave ou QR Code de pagamento é gerado.</p>' : '') + '<small>Dados fictícios. Nenhuma transação ou aprovação de pagamento será realizada.</small>';
}
function voltarEdicaoCheckout() {
  checkoutEmRevisao = false;
  document.getElementById('dados-formulario').hidden = false;
  document.getElementById('dados-revisao').hidden = true;
  document.getElementById('opcoes-pagamento').hidden = false;
  document.getElementById('revisar').hidden = false;
  document.getElementById('concluir').hidden = true;
  document.querySelector('main h1').textContent = 'Finalizar compra';
}
function iniciarCheckout() {
  const formulario = document.getElementById('checkout-form');
  for (const uf of estadosBrasil) document.getElementById('estado').add(new Option(uf,uf));
  document.getElementById('estado').value = 'RS';
  for (let i = 1; i <= 10; i++) document.getElementById('parcelas').add(new Option(i + 'x sem juros · total ' + moeda(somarCarrinho(estado.cart)),String(i)));
  function entrega() {
    const retirada = document.getElementById('modalidade').value === 'retirada';
    document.getElementById('endereco-entrega').hidden = retirada;
    document.getElementById('endereco-entrega').disabled = retirada;
  }
  document.getElementById('modalidade').addEventListener('change',entrega);
  formulario.addEventListener('change',function (evento) {
    if (evento.target.name === 'payment') document.getElementById('parcelas').value = '1';
    atualizarResumoCheckout();
  });
  formulario.addEventListener('submit',function (evento) {
    evento.preventDefault();
    const dados = new FormData(formulario);
    clienteCheckout = {};
    for (const nome of ['name','email','phone','cep','street','number','district','city','state','delivery']) clienteCheckout[nome] = String(dados.get(nome) || '').trim();
    let erro = validarCliente(clienteCheckout);
    const selecao = selecaoCheckout();
    if (!erro && !selecao.method) erro = 'Escolha uma forma de pagamento demonstrativa.';
    const mensagem = document.getElementById('erro-checkout');
    mensagem.textContent = erro; mensagem.hidden = !erro;
    if (erro) return;
    checkoutEmRevisao = true;
    document.querySelector('main h1').textContent = 'Revisar demonstração';
    const endereco = clienteCheckout.delivery === 'retirada' ? 'Retirada demonstrativa' : clienteCheckout.street + ', ' + clienteCheckout.number + ' — ' + clienteCheckout.district + ', ' + clienteCheckout.city + '/' + clienteCheckout.state + ', CEP ' + clienteCheckout.cep;
    document.getElementById('dados-revisao').innerHTML = '<h2>Confira os dados</h2><dl class="review-data"><dt>Nome</dt><dd>' + textoSeguro(clienteCheckout.name) + '</dd><dt>E-mail</dt><dd>' + textoSeguro(clienteCheckout.email) + '</dd><dt>Telefone</dt><dd>' + textoSeguro(clienteCheckout.phone) + '</dd><dt>Entrega</dt><dd>' + textoSeguro(endereco) + '</dd></dl><button type="button" class="button outline" id="editar-checkout">Editar dados</button>';
    document.getElementById('editar-checkout').addEventListener('click',voltarEdicaoCheckout);
    document.getElementById('dados-formulario').hidden = true;
    document.getElementById('dados-revisao').hidden = false;
    document.getElementById('opcoes-pagamento').hidden = true;
    document.getElementById('revisar').hidden = true;
    document.getElementById('concluir').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('concluir').addEventListener('click',function () {
    if (!checkoutEmRevisao || checkoutConcluindo || !Object.keys(estado.cart).length) return;
    checkoutConcluindo = true;
    document.getElementById('concluir').disabled = true;
    const selecao = selecaoCheckout();
    const calculo = calcularPagamento(somarCarrinho(estado.cart),selecao.method,selecao.installments);
    const id = 'DEMO-' + Date.now().toString(36).toUpperCase();
    // Nenhum dado pessoal do formulário é guardado no histórico.
    estado.orders.unshift({ id: id, date: new Date().toISOString(), items: { ...estado.cart }, totalCents: calculo.totalCents, payment: { method: calculo.method, installments: calculo.installments } });
    estado.orders = estado.orders.slice(0,20);
    estado.cart = {};
    salvarEstado();
    window.location.href = '/confirmacao.html?pedido=' + encodeURIComponent(id);
  });
  entrega(); atualizarResumoCheckout();
}
function mostrarConfirmacao() {
  const id = new URLSearchParams(window.location.search).get('pedido');
  const pedido = estado.orders.find(function (item) { return item.id === id; });
  const elemento = document.getElementById('confirmacao-pedido');
  if (!pedido) {
    document.querySelector('main h1').textContent = 'Confirmação demonstrativa';
    elemento.innerHTML = estadoVazio('Nenhuma demonstração encontrada neste endereço','Conclua o checkout ou consulte o histórico salvo neste navegador.') + '<a class="button outline spaced" href="/pedidos.html">Ver demonstrações salvas</a>'; return;
  }
  elemento.innerHTML = '<div class="panel success">' + icone('check-circle-2',52) + '<h2>Simulação de compra concluída com sucesso</h2><p>Nenhum pedido foi processado, nenhum pagamento foi realizado e nenhum produto foi reservado.</p>' + resumoPedido(pedido) + '<div class="actions"><a class="button primary" href="/pedidos.html">Ver demonstrações salvas</a><a class="button outline" href="/pedido.html?id=' + encodeURIComponent(pedido.id) + '">Ver detalhes desta demonstração</a><a class="button outline" href="/index.html">Voltar para a Home</a></div></div>';
}
if (document.body.dataset.pagina === 'checkout') iniciarCheckout();
if (document.body.dataset.pagina === 'confirmacao') mostrarConfirmacao();
