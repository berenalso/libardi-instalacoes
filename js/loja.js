// Estado compartilhado por páginas HTML usando o mesmo LocalStorage da versão anterior.
const chaveLocal = 'libardi:v1';
let avisoArmazenamento = false;
let estado = lerEstado();
let tempoMensagem;
document.documentElement.dataset.theme = estado.theme;

function lerEstado() {
  const vazio = { cart: {}, favorites: [], theme: 'light', orders: [] };
  try {
    const salvo = JSON.parse(localStorage.getItem(chaveLocal) || '{}');
    if (!salvo || typeof salvo !== 'object') return vazio;
    vazio.cart = limparCarrinho(salvo.cart);
    if (Array.isArray(salvo.favorites)) {
      for (const id of salvo.favorites) if (buscarProduto(id) && !vazio.favorites.includes(id)) vazio.favorites.push(id);
    }
    vazio.theme = salvo.theme === 'dark' ? 'dark' : 'light';
    if (Array.isArray(salvo.orders)) {
      for (const pedido of salvo.orders.slice(0, 20)) {
        if (!pedido || typeof pedido.id !== 'string' || typeof pedido.date !== 'string' || !Number.isFinite(Date.parse(pedido.date))) continue;
        const itens = limparCarrinho(pedido.items);
        if (!Object.keys(itens).length) continue;
        const pagamento = normalizarPagamento(pedido.payment);
        vazio.orders.push({ id: pedido.id, date: pedido.date, items: itens, payment: pagamento,
          totalCents: calcularPagamento(somarCarrinho(itens), pagamento.method, pagamento.installments).totalCents });
      }
    }
    return vazio;
  } catch (erro) {
    return vazio;
  }
}
function salvarEstado() {
  try {
    localStorage.setItem(chaveLocal, JSON.stringify(estado));
    avisoArmazenamento = false;
  } catch (erro) {
    avisoArmazenamento = true;
  }
  atualizarCabecalho();
  atualizarFavoritos();
  const aviso = document.getElementById('aviso-armazenamento');
  if (aviso) aviso.hidden = !avisoArmazenamento;
}
function icone(nome, tamanho = 24) {
  return '<svg class="icone" width="' + tamanho + '" height="' + tamanho + '" aria-hidden="true"><use href="/imagens/icones.svg#' + nome + '"></use></svg>';
}
function logo() {
  return '<a class="logo" href="/index.html" aria-label="Libardi Instalações — início"><img src="/imagens/logo.png" alt="" width="50" height="50"><span><strong>LIBARDI</strong><small>INSTALAÇÕES</small></span></a>';
}
function pesquisaHtml(mobile) {
  return '<form class="search-form" action="/catalogo.html" role="search"><input name="q" aria-label="Buscar produtos" placeholder="' + (mobile ? 'Buscar produtos' : 'O que você procura?') + '"><button aria-label="Pesquisar" type="submit">' + icone('search', 21) + '</button></form>';
}
function botaoTema() {
  return '<button class="icon-button theme-button" data-tema type="button" aria-label="Alternar tema"></button>';
}
function prepararLayout() {
  document.getElementById('cabecalho').innerHTML = '<a class="skip-link" href="#conteudo">Pular para o conteúdo</a><header class="header">' + logo() +
    '<div class="desktop-search">' + pesquisaHtml(false) + '</div><nav class="header-actions" aria-label="Principal">' + botaoTema() +
    '<a class="button secondary desktop-only" href="/explorar.html">Explorar</a><a class="icon-button mobile-only" aria-label="Abrir pesquisa" href="/pesquisa.html">' + icone('search') + '</a>' +
    '<a class="icon-button cart-link" href="/carrinho.html">' + icone('shopping-cart') + '<span class="badge" hidden></span></a>' +
    '<a class="account-link desktop-only" href="/perfil.html">' + icone('user-round') + '<span>Minha<br>conta</span></a></nav></header>' +
    '<div id="aviso-armazenamento" class="notice" role="alert" hidden>Seu navegador não permitiu salvar os dados. Habilite o armazenamento para manter carrinho e preferências entre as páginas.</div>';
  let linksProdutos = '';
  for (const categoria of categorias.slice(0, 4)) linksProdutos += '<a href="/catalogo.html?categoria=' + slug(categoria) + '">' + categoria + '</a>';
  document.getElementById('rodape').innerHTML = '<footer class="footer"><div class="footer-columns"><section>' + logo() +
    '<p>Materiais elétricos e serviços de instalação com qualidade, segurança e atendimento próximo.</p></section><section><h3>Produtos</h3>' + linksProdutos + '</section>' +
    '<section><h3>Serviços</h3><a href="/servicos.html">Instalação residencial</a><a href="/servicos.html">Instalação comercial</a><a href="/servicos.html">Manutenção</a><a href="/orcamento.html">Solicitar orçamento</a></section>' +
    '<section><h3>Institucional</h3><a href="/sobre.html">Sobre a Libardi</a><a href="/trabalhe-conosco.html">Trabalhe conosco</a><a href="/privacidade.html">Política de privacidade</a><a href="/termos.html">Termos de uso</a></section>' +
    '<section><h3>Ajuda</h3><a href="/ajuda.html">Central de ajuda</a><a href="/trocas.html">Trocas e devoluções</a><a href="/entregas.html">Prazos de entrega</a><a href="/pedidos.html">Meus pedidos</a></section>' +
    '<section><h3>Contato</h3><a href="tel:+5551999718787">' + icone('phone', 16) + '(51) 99971-8787</a><p>' + icone('map-pin', 16) + ' R. Gen. Daltro Filho, 88 — Centro, Sapiranga — RS, 93800-236</p><a href="/ajuda.html">Fale com a gente ' + icone('arrow-right', 14) + '</a></section></div>' +
    '<div class="footer-demo"><strong>Ambiente demonstrativo</strong><span>Preços e avaliações de exemplo. Sem cobrança, pedidos reais ou envio de formulários.</span></div><p class="copyright">© 2026 Libardi Instalações. Todos os direitos reservados.</p></footer>';
  const destinos = [['index.html','Início','home'],['explorar.html','Categorias','layout-grid'],['favoritos.html','Favoritos','heart'],['pedidos.html','Pedidos','receipt-text'],['perfil.html','Perfil','user-round']];
  let navegacao = '<nav class="bottom-nav" aria-label="Navegação mobile">';
  const pagina = document.body.dataset.pagina;
  for (const destino of destinos) {
    let ativo = pagina === destino[0].replace('.html','');
    if (destino[0] === 'explorar.html' && ['catalogo','produto'].includes(pagina)) ativo = true;
    navegacao += '<a href="/' + destino[0] + '"' + (ativo ? ' class="active" aria-current="page"' : '') + '>' + icone(destino[2],23) + '<span>' + destino[1] + '</span></a>';
  }
  document.getElementById('navegacao-mobile').innerHTML = navegacao + '</nav>';
  document.getElementById('mensagem').className = 'toast';
  atualizarCabecalho();
}
function atualizarCabecalho() {
  let quantidade = 0;
  for (const id in estado.cart) quantidade += estado.cart[id];
  for (const link of document.querySelectorAll('.cart-link')) {
    link.setAttribute('aria-label', 'Carrinho, ' + quantidade + ' itens');
    const contador = link.querySelector('.badge');
    contador.textContent = quantidade;
    contador.hidden = quantidade === 0;
  }
  for (const botao of document.querySelectorAll('[data-tema]')) {
    botao.setAttribute('aria-label', estado.theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    botao.innerHTML = icone(estado.theme === 'dark' ? 'sun' : 'moon');
  }
}
function mostrarMensagem(texto) {
  const elemento = document.getElementById('mensagem');
  elemento.textContent = texto;
  elemento.classList.add('shown');
  clearTimeout(tempoMensagem);
  tempoMensagem = setTimeout(function () { elemento.classList.remove('shown'); }, 3500);
}
function botaoFavorito(id) {
  return '<button type="button" class="icon-button favorite" data-favorito="' + id + '">' + icone('heart',22) + '</button>';
}
function atualizarFavoritos() {
  for (const botao of document.querySelectorAll('[data-favorito]')) {
    const id = botao.dataset.favorito;
    const ativo = estado.favorites.includes(id);
    botao.classList.toggle('selected', ativo);
    botao.setAttribute('aria-pressed', String(ativo));
    botao.setAttribute('aria-label', (ativo ? 'Remover dos favoritos: ' : 'Adicionar aos favoritos: ') + id);
  }
}
function imagemProduto(produto, grande) {
  return '<div class="product-image' + (grande ? ' large' : '') + '"><img src="' + produto.image + '" alt="' + textoSeguro(produto.imageNote || produto.name) + '" loading="' + (grande ? 'eager' : 'lazy') + '"></div>';
}
function cardProduto(produto) {
  const endereco = '/produto.html?id=' + produto.id;
  const parcelas = calcularPagamento(produto.priceCents,'credit',10);
  return '<article class="product-card"><div class="image-wrap"><a href="' + endereco + '">' + imagemProduto(produto,false) + '</a><span class="price-tag">Preço exemplo</span>' + botaoFavorito(produto.id) + '</div>' +
    (produto.imageNote ? '<small class="image-note">Imagem ilustrativa</small>' : '') +
    '<a class="product-name" href="' + endereco + '">' + textoSeguro(produto.name) + '</a><div class="product-meta"><span>' + textoSeguro(produto.category) + '</span><p>' + textoSeguro(produto.description) + '</p></div>' +
    '<div class="desktop-price"><p class="rating"><span aria-label="Avaliação">★★★★★</span> ' + produto.rating.toFixed(1).replace('.',',') + ' · exemplo</p><del>' + moeda(Math.round(produto.priceCents * 1.15)) + '</del></div>' +
    '<strong class="price">' + moeda(produto.priceCents) + '</strong><small class="mobile-only">Preço de exemplo</small><div class="desktop-price"><small>' + moeda(calcularPagamento(produto.priceCents,'pix',1).totalCents) + ' Pix · exemplo</small><small>' + descreverParcelas(parcelas.amounts) + ' · exemplo</small></div>' +
    '<a class="button outline view-product" href="' + endereco + '">Ver produto</a><button class="button primary add-product" data-adicionar="' + produto.id + '" type="button">' + icone('shopping-cart',17) + '<span class="desktop-only">Adicionar ao carrinho</span><span class="mobile-only">Comprar</span></button></article>';
}
function mostrarGrade(elemento, itens) {
  elemento.innerHTML = itens.map(cardProduto).join('');
  atualizarFavoritos();
}
function estadoVazio(titulo, texto) {
  return '<div class="empty panel">' + icone('box',44) + '<h2>' + textoSeguro(titulo) + '</h2><p>' + textoSeguro(texto || '') + '</p><a class="button primary" href="/catalogo.html">Explorar catálogo</a></div>';
}
function controleQuantidade(id, quantidade) {
  return '<div class="quantity" role="group" aria-label="Quantidade de ' + textoSeguro(buscarProduto(id).name) + '"><button type="button" data-quantidade="' + id + '" data-valor="' + (quantidade - 1) + '" aria-label="Diminuir quantidade"' + (quantidade <= 1 ? ' disabled' : '') + '>' + icone('minus',14) + '</button><span aria-live="polite">' + quantidade + '</span><button type="button" data-quantidade="' + id + '" data-valor="' + (quantidade + 1) + '" aria-label="Aumentar quantidade"' + (quantidade >= 99 ? ' disabled' : '') + '>' + icone('plus',14) + '</button></div>';
}
function resumoPedido(pedido) {
  const pagamento = normalizarPagamento(pedido.payment);
  const calculo = calcularPagamento(somarCarrinho(pedido.items),pagamento.method,pagamento.installments);
  let itens = '';
  for (const id in pedido.items) {
    const produto = buscarProduto(id);
    itens += '<li><span>' + textoSeguro(produto.name) + '</span><span>' + pedido.items[id] + ' × ' + moeda(produto.priceCents) + '</span><strong>' + moeda(produto.priceCents * pedido.items[id]) + '</strong></li>';
  }
  return '<section class="saved-order-summary" aria-label="Resumo da demonstração"><h2>Resumo da demonstração</h2><p>Número fictício: <strong>' + textoSeguro(pedido.id) + '</strong></p><ul class="confirmation-items">' + itens + '</ul><p>Subtotal: ' + moeda(calculo.subtotalCents) + '</p>' +
    (calculo.discountCents ? '<p>Desconto Pix de exemplo: −' + moeda(calculo.discountCents) + '</p>' : '') + '<p>Forma selecionada: <strong>' + nomesPagamento[calculo.method] + '</strong></p><p>' + descreverParcelas(calculo.amounts) + '</p><p>Total demonstrativo: <strong class="price">' + moeda(calculo.totalCents) + '</strong></p><small>Sem cobrança, aprovação de pagamento ou pedido real.</small></section>';
}

prepararLayout();
document.addEventListener('click', function (evento) {
  const tema = evento.target.closest('[data-tema]');
  if (tema) {
    estado.theme = estado.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = estado.theme;
    salvarEstado();
  }
  const adicionar = evento.target.closest('[data-adicionar]');
  if (adicionar) {
    const quantidade = adicionar.closest('.product-buy') ? document.getElementById('quantidade-produto') : null;
    if (adicionarAoCarrinho(estado.cart,adicionar.dataset.adicionar,quantidade ? Number(quantidade.textContent) : 1)) {
      salvarEstado(); mostrarMensagem('Produto adicionado ao carrinho.');
    }
  }
  const favorito = evento.target.closest('[data-favorito]');
  if (favorito && buscarProduto(favorito.dataset.favorito)) {
    const id = favorito.dataset.favorito;
    if (estado.favorites.includes(id)) estado.favorites = estado.favorites.filter(function (valor) { return valor !== id; });
    else estado.favorites.push(id);
    salvarEstado();
    if (document.body.dataset.pagina === 'favoritos') mostrarFavoritos();
  }
});
document.addEventListener('error', function (evento) {
  if (evento.target.tagName === 'IMG' && evento.target.parentElement.classList.contains('product-image')) {
    evento.target.parentElement.innerHTML = '<div class="photo-placeholder">' + icone('box',32) + '<span>Foto em atualização</span></div>';
  }
}, true);
window.addEventListener('storage', function (evento) {
  if (evento.key !== chaveLocal) return;
  estado = lerEstado();
  document.documentElement.dataset.theme = estado.theme;
  atualizarCabecalho(); atualizarFavoritos();
  if (document.body.dataset.pagina === 'carrinho') mostrarCarrinho();
  if (document.body.dataset.pagina === 'favoritos') mostrarFavoritos();
  if (document.body.dataset.pagina === 'checkout') atualizarResumoCheckout();
});
