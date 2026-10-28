// Regras da loja: funções comuns, sem frameworks e sem alterar a tela.
function moeda(centavos) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(centavos / 100);
}
function normalizar(texto) {
  return String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
function slug(texto) {
  return normalizar(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function buscarProduto(id) {
  return produtos.find(function (produto) { return produto.id === id; });
}
function limparCarrinho(valor) {
  const resultado = {};
  if (!valor || typeof valor !== 'object' || Array.isArray(valor)) return resultado;
  for (const id in valor) {
    const quantidade = valor[id];
    if (buscarProduto(id) && Number.isFinite(quantidade) && quantidade >= 1) {
      resultado[id] = Math.min(99, Math.floor(quantidade));
    }
  }
  return resultado;
}
function somarCarrinho(carrinho) {
  const itens = limparCarrinho(carrinho);
  let total = 0;
  for (const id in itens) total += buscarProduto(id).priceCents * itens[id];
  return total;
}
function adicionarAoCarrinho(carrinho, id, quantidade) {
  const produto = buscarProduto(id);
  if (!produto || !produto.available || !Number.isSafeInteger(quantidade) || quantidade < 1) return false;
  carrinho[id] = Math.min(99, (carrinho[id] || 0) + quantidade);
  return true;
}
function alterarQuantidade(carrinho, id, quantidade) {
  if (!buscarProduto(id) || !Number.isSafeInteger(quantidade) || quantidade < 0) return false;
  if (quantidade === 0) delete carrinho[id];
  else carrinho[id] = Math.min(99, quantidade);
  return true;
}
function filtrarProdutos(filtros) {
  const resultado = produtos.filter(function (produto) {
    return (!filtros.query || normalizar(produto.name + ' ' + produto.brand).includes(normalizar(filtros.query))) &&
      (!filtros.category || slug(produto.category) === filtros.category) &&
      (!filtros.type || slug(produto.category) === filtros.type) &&
      (!filtros.brand || produto.brand === filtros.brand) &&
      (filtros.minimum === undefined || produto.priceCents >= filtros.minimum) &&
      (filtros.maximum === undefined || produto.priceCents <= filtros.maximum) &&
      (!filtros.rating || produto.rating >= filtros.rating) &&
      (!filtros.available || produto.available);
  });
  if (filtros.sort === 'menor-preco') resultado.sort(function (a, b) { return a.priceCents - b.priceCents; });
  if (filtros.sort === 'maior-preco') resultado.sort(function (a, b) { return b.priceCents - a.priceCents; });
  if (filtros.sort === 'avaliacao') resultado.sort(function (a, b) { return b.rating - a.rating; });
  if (filtros.sort === 'novidades') resultado.reverse();
  if (filtros.sort === 'mais-vendidos') {
    const destaques = ['cabo25', 'tomada10', 'bipolar', 'painel'];
    resultado.sort(function (a, b) {
      const primeiro = destaques.includes(a.id) ? destaques.indexOf(a.id) : 99;
      const segundo = destaques.includes(b.id) ? destaques.indexOf(b.id) : 99;
      return primeiro - segundo;
    });
  }
  return resultado;
}
const nomesPagamento = { debit: 'Cartão de débito', credit: 'Cartão de crédito', pix: 'Pix' };
function normalizarPagamento(valor) {
  const metodo = valor && (valor.method === 'credit' || valor.method === 'pix') ? valor.method : 'debit';
  let parcelas = 1;
  if (metodo === 'credit' && valor && Number.isFinite(valor.installments)) parcelas = Math.min(10, Math.max(1, Math.floor(valor.installments)));
  return { method: metodo, installments: parcelas };
}
function calcularPagamento(subtotal, metodo, numeroParcelas) {
  if (!Number.isSafeInteger(subtotal) || subtotal < 0) subtotal = 0;
  const selecao = normalizarPagamento({ method: metodo, installments: numeroParcelas });
  const total = selecao.method === 'pix' ? Math.round(subtotal * 95 / 100) : subtotal;
  const valores = [];
  const valorBase = Math.floor(total / selecao.installments);
  const centavosRestantes = total % selecao.installments;
  for (let i = 0; i < selecao.installments; i++) valores.push(valorBase + (i < centavosRestantes ? 1 : 0));
  return { method: selecao.method, installments: selecao.installments, subtotalCents: subtotal, discountCents: subtotal - total, totalCents: total, amounts: valores };
}
function descreverParcelas(valores) {
  if (valores.length === 1) return 'À vista: ' + moeda(valores[0]);
  const minimo = Math.min(...valores);
  const maximo = Math.max(...valores);
  if (minimo === maximo) return valores.length + 'x de ' + moeda(minimo) + ' sem juros';
  return valores.length + ' parcelas de ' + moeda(minimo) + ' a ' + moeda(maximo) + ' sem juros';
}
const estadosBrasil = 'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ');
function validarCliente(cliente) {
  if (cliente.name.trim().split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email.trim())) return 'Informe um e-mail válido.';
  if (!/^[\d\s()+.-]+$/.test(cliente.phone) || !/^\d{10,11}$/.test(cliente.phone.replace(/\D/g, ''))) return 'Informe um telefone com DDD e 10 ou 11 dígitos.';
  if (!['entrega', 'retirada'].includes(cliente.delivery)) return 'Escolha entrega ou retirada.';
  if (cliente.delivery === 'entrega') {
    if (!/^\d{5}-?\d{3}$/.test(cliente.cep.trim())) return 'Informe um CEP com 8 dígitos.';
    if (![cliente.street, cliente.number, cliente.district, cliente.city].every(function (valor) { return valor.trim().length > 0; })) return 'Preencha rua, número, bairro e cidade. Espaços em branco não são válidos.';
    if (!estadosBrasil.includes(cliente.state)) return 'Escolha um estado válido.';
  }
  return '';
}
// Escapa textos antes de inseri-los em modelos HTML.
function textoSeguro(valor) {
  return String(valor).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
