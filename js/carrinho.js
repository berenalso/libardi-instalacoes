function mostrarCarrinho() {
  const elemento = document.getElementById('conteudo-carrinho');
  if (!Object.keys(estado.cart).length) {
    elemento.innerHTML = estadoVazio('Seu carrinho está vazio','Encontre os materiais para sua próxima instalação.'); return;
  }
  let itens = '';
  for (const id in estado.cart) {
    const produto = buscarProduto(id);
    const quantidade = estado.cart[id];
    itens += '<article class="cart-item panel"><a href="/produto.html?id=' + id + '">' + imagemProduto(produto,false) + '</a><div class="cart-name"><a href="/produto.html?id=' + id + '">' + textoSeguro(produto.name) + '</a><small>' + moeda(produto.priceCents) + ' por unidade · exemplo</small></div><div>' + controleQuantidade(id,quantidade) + '<button type="button" class="remove-button" data-remover="' + id + '" aria-label="Remover ' + textoSeguro(produto.name) + '">' + icone('trash-2',15) + 'Remover</button></div><strong>' + moeda(produto.priceCents * quantidade) + '</strong></article>';
  }
  const total = somarCarrinho(estado.cart);
  elemento.innerHTML = '<div class="checkout-grid"><div class="cart-list">' + itens + '</div><aside class="panel order-summary" aria-live="polite"><h2>Resumo do pedido</h2><p>Subtotal dos produtos</p><strong class="price">' + moeda(total) + '</strong><p class="muted">Frete não calculado nesta demonstração.</p><hr><h3>Total dos produtos</h3><strong class="detail-price">' + moeda(total) + '</strong><a class="button primary" href="/checkout.html">Prosseguir para o checkout</a><small>Sem cobrança ou reserva de estoque.</small></aside></div>';
}
document.getElementById('conteudo-carrinho').addEventListener('click',function (evento) {
  const quantidade = evento.target.closest('[data-quantidade]');
  const remover = evento.target.closest('[data-remover]');
  if (quantidade) alterarQuantidade(estado.cart,quantidade.dataset.quantidade,Number(quantidade.dataset.valor));
  if (remover) alterarQuantidade(estado.cart,remover.dataset.remover,0);
  if (quantidade || remover) { salvarEstado(); mostrarCarrinho(); }
});
mostrarCarrinho();
