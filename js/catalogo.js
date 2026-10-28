// Home, catálogo, detalhe e favoritos. Cada página usa apenas sua função.
const paginaCatalogo = document.body.dataset.pagina;
const parametrosCatalogo = new URLSearchParams(window.location.search);

function iniciarHome() {
  const nomes = ['Fios e Cabos','Tomadas','Interruptores','Disjuntores','Ferramentas','Fixadores','Eletrodutos','Iluminação'];
  const destinos = [categorias[0],categorias[1],categorias[1],categorias[3],categorias[4],'Fixadores','Eletrodutos',categorias[2]];
  document.getElementById('categorias-desktop').innerHTML = nomes.map(function (nome, i) {
    return '<a href="/catalogo.html?categoria=' + slug(destinos[i]) + '">' + nome + icone('arrow-right',20) + '</a>';
  }).join('');
  const nomesMobile = ['Fios e cabos','Tomadas','Iluminação','Proteção elétrica'];
  const icones = ['zap','box','sun','layout-grid'];
  document.getElementById('categorias-mobile').innerHTML = nomesMobile.map(function (nome, i) {
    return '<a href="/catalogo.html?categoria=' + slug(categorias[i]) + '">' + icone(icones[i]) + nome + '</a>';
  }).join('');
  const destaques = ['cabo25','tomada10','bipolar','painel'].map(buscarProduto);
  mostrarGrade(document.getElementById('destaques-desktop'),destaques);
  mostrarGrade(document.getElementById('destaques-mobile'),destaques.slice(0,2));
  mostrarGrade(document.getElementById('mais-vendidos-mobile'),destaques.slice(2));
}
function iniciarCatalogo() {
  const formulario = document.getElementById('filtros');
  const marcas = [...new Set(produtos.map(function (produto) { return produto.brand; }))].sort();
  for (const marca of marcas) document.getElementById('marca').add(new Option(marca,marca));
  for (const categoria of categorias) document.getElementById('tipo').add(new Option(categoria,slug(categoria)));
  for (const nome of ['q','min','max','marca','nota','tipo']) formulario.elements[nome].value = parametrosCatalogo.get(nome) || '';
  formulario.elements.disponivel.checked = parametrosCatalogo.get('disponivel') === 'sim';
  document.getElementById('ordem').value = parametrosCatalogo.get('ordem') || '';
  const categoria = parametrosCatalogo.get('categoria') || '';
  const nomeCategoria = [...categorias,'Fixadores','Eletrodutos'].find(function (nome) { return slug(nome) === categoria; });
  if (nomeCategoria) {
    document.querySelector('main h1').textContent = nomeCategoria;
    document.title = nomeCategoria + ' — Libardi Instalações';
  }
  function atualizar() {
    const dados = new FormData(formulario);
    const parametros = new URLSearchParams();
    if (categoria) parametros.set('categoria',categoria);
    for (const [nome, valor] of dados) if (String(valor).trim()) parametros.set(nome,String(valor).trim());
    const ordem = document.getElementById('ordem').value;
    if (ordem) parametros.set('ordem',ordem);
    // Só atualiza a consulta da página HTML; não usa roteador ou framework.
    history.replaceState(null,'','/catalogo.html' + (parametros.size ? '?' + parametros.toString() : ''));
    function preco(nome) {
      const valor = dados.get(nome);
      return valor !== '' && Number.isFinite(Number(valor)) && Number(valor) >= 0 ? Math.round(Number(valor) * 100) : undefined;
    }
    const itens = filtrarProdutos({ query: dados.get('q'), category: categoria, type: dados.get('tipo'), brand: dados.get('marca'), minimum: preco('min'), maximum: preco('max'), rating: Number(dados.get('nota')), available: dados.get('disponivel') === 'sim', sort: ordem });
    document.querySelector('main .subtitle').textContent = dados.get('q') ? 'Resultados para “' + dados.get('q') + '”' : 'Preços, disponibilidade e avaliações demonstrativos.';
    document.getElementById('contagem-produtos').textContent = itens.length + ' produtos';
    document.getElementById('fechar-filtros').textContent = 'Ver ' + itens.length + ' produtos';
    const resultado = document.getElementById('resultado-catalogo');
    if (itens.length) {
      resultado.innerHTML = '<div class="product-grid" id="produtos-catalogo"></div>';
      mostrarGrade(document.getElementById('produtos-catalogo'),itens);
    } else resultado.innerHTML = estadoVazio('Nenhum produto encontrado','Tente outro nome ou limpe os filtros.') + '<button class="button outline spaced" type="button" data-limpar-busca>Limpar busca e filtros</button>';
  }
  formulario.addEventListener('input',atualizar);
  formulario.addEventListener('change',atualizar);
  formulario.addEventListener('submit',function (evento) { evento.preventDefault(); atualizar(); });
  document.getElementById('ordem').addEventListener('change',atualizar);
  function painel(aberto) {
    document.getElementById('painel-filtros').classList.toggle('filters-open',aberto);
    document.getElementById('abrir-filtros').setAttribute('aria-expanded',String(aberto));
  }
  document.getElementById('abrir-filtros').addEventListener('click',function () { painel(!document.getElementById('painel-filtros').classList.contains('filters-open')); });
  document.getElementById('fechar-filtros').addEventListener('click',function () { painel(false); });
  function limpar() {
    formulario.reset();
    for (const nome of ['q','min','max','marca','nota','tipo']) formulario.elements[nome].value = '';
    formulario.elements.disponivel.checked = false;
    document.getElementById('ordem').value = '';
    atualizar(); painel(false);
  }
  document.getElementById('limpar-filtros').addEventListener('click',limpar);
  document.getElementById('resultado-catalogo').addEventListener('click',function (evento) { if (evento.target.closest('[data-limpar-busca]')) limpar(); });
  atualizar();
}
function iniciarProduto() {
  const produto = buscarProduto(parametrosCatalogo.get('id'));
  const elemento = document.getElementById('detalhe-produto');
  if (!produto) {
    document.querySelector('main h1').textContent = 'Produto não encontrado';
    elemento.innerHTML = estadoVazio('Este produto não está no catálogo'); return;
  }
  document.querySelector('main h1').textContent = produto.name;
  document.title = produto.name + ' — Libardi Instalações';
  let especificacoes = '';
  for (const linha of produto.specs) {
    const partes = linha.split(':');
    especificacoes += '<div><dt>' + textoSeguro(partes.shift()) + '</dt><dd>' + textoSeguro(partes.join(':').trim()) + '</dd></div>';
  }
  elemento.innerHTML = '<a class="button secondary back-category" href="/catalogo.html?categoria=' + slug(produto.category) + '">Voltar à categoria</a><section class="product-detail panel"><div class="detail-photo">' + imagemProduto(produto,true) + botaoFavorito(produto.id) + (produto.imageNote ? '<p class="image-note">' + textoSeguro(produto.imageNote) + '</p>' : '') + '</div>' +
    '<div class="detail-info"><h2>' + textoSeguro(produto.name) + '</h2><p class="muted">★ ' + produto.rating.toFixed(1).replace('.',',') + ' · avaliações de exemplo</p><p class="desktop-only muted">Vendido e entregue por Libardi Instalações</p><strong class="detail-price">' + moeda(produto.priceCents) + '</strong><small>Preço demonstrativo · sem oferta comercial</small><p>' + moeda(calcularPagamento(produto.priceCents,'pix',1).totalCents) + ' no Pix · 5% de desconto de exemplo</p>' +
    '<div class="quantity-row"><span>Quantidade</span><div class="quantity" role="group" aria-label="Quantidade"><button type="button" id="diminuir-produto" aria-label="Diminuir quantidade" disabled>' + icone('minus',14) + '</button><span id="quantidade-produto" aria-live="polite">1</span><button type="button" id="aumentar-produto" aria-label="Aumentar quantidade">' + icone('plus',14) + '</button></div></div><div class="product-buy"><button class="button primary" type="button" data-adicionar="' + produto.id + '">Adicionar ao carrinho</button></div><div class="delivery-info">' + icone('truck') + '<div><strong>Entrega e retirada</strong><p>Disponibilidade e frete a confirmar na operação real.</p></div></div></div>' +
    '<div class="detail-description"><details open><summary>Descrição</summary><p>' + textoSeguro(produto.description) + '</p></details><details open><summary>Especificações técnicas</summary><dl>' + especificacoes + '</dl></details></div></section><section class="related"><h2>Produtos relacionados</h2><div id="produtos-relacionados" class="product-grid"></div></section>';
  let quantidade = 1;
  function alterar(diferenca) {
    quantidade = Math.max(1,Math.min(99,quantidade + diferenca));
    document.getElementById('quantidade-produto').textContent = quantidade;
    document.getElementById('diminuir-produto').disabled = quantidade <= 1;
    document.getElementById('aumentar-produto').disabled = quantidade >= 99;
  }
  document.getElementById('diminuir-produto').addEventListener('click',function () { alterar(-1); });
  document.getElementById('aumentar-produto').addEventListener('click',function () { alterar(1); });
  mostrarGrade(document.getElementById('produtos-relacionados'),produtos.filter(function (outro) { return outro.category === produto.category && outro.id !== produto.id; }).slice(0,3));
  atualizarFavoritos();
}
function mostrarFavoritos() {
  const itens = produtos.filter(function (produto) { return estado.favorites.includes(produto.id); });
  const elemento = document.getElementById('lista-favoritos');
  if (!itens.length) elemento.innerHTML = estadoVazio('Sua lista de favoritos está vazia','Toque no coração de um produto para salvá-lo aqui.');
  else { elemento.innerHTML = '<div class="product-grid"></div>'; mostrarGrade(elemento.querySelector('.product-grid'),itens); }
}
function iniciarExplorar() {
  let departamentos = '';
  for (const categoria of [...categorias,'Fixadores','Eletrodutos']) departamentos += '<a class="menu-row" href="/catalogo.html?categoria=' + slug(categoria) + '">' + categoria + icone('arrow-right',18) + '</a>';
  document.getElementById('explorar-conteudo').innerHTML = '<section class="panel"><h2>Departamentos</h2>' + departamentos + '<a class="menu-row" href="/catalogo.html">Todos os produtos →</a><a class="menu-row" href="/catalogo.html?ordem=menor-preco">Ofertas de exemplo →</a></section><section class="panel"><h2>Sua conta</h2><a class="menu-row" href="/favoritos.html">Favoritos →</a><a class="menu-row" href="/pedidos.html">Meus pedidos →</a><a class="menu-row" href="/perfil.html">Minha conta →</a><h2 class="spaced">Aparência</h2><div class="actions">' + botaoTema() + '<span>Alternar entre claro e escuro</span></div><h2 class="spaced">Serviços e atendimento</h2><a class="menu-row" href="/servicos.html">Instalação elétrica →</a><a class="menu-row" href="/ajuda.html">Falar com a Libardi →</a></section>';
  atualizarCabecalho();
}
if (paginaCatalogo === 'index') iniciarHome();
if (paginaCatalogo === 'catalogo') iniciarCatalogo();
if (paginaCatalogo === 'produto') iniciarProduto();
if (paginaCatalogo === 'favoritos') mostrarFavoritos();
if (paginaCatalogo === 'explorar') iniciarExplorar();
