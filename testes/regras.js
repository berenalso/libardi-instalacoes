// Testes em JavaScript puro. Abra testes/index.html pelo servidor estático.
let aprovados = 0;
let reprovados = 0;
const resultados = [];
function conferir(nome, condicao) {
  resultados.push({ nome: nome, aprovado: Boolean(condicao) });
  if (condicao) aprovados++;
  else reprovados++;
}
function iguais(primeiro, segundo) { return JSON.stringify(primeiro) === JSON.stringify(segundo); }

conferir('Catálogo preserva 26 produtos com IDs únicos',produtos.length === 26 && new Set(produtos.map(function (p) { return p.id; })).size === 26);
conferir('Preços são inteiros positivos em centavos',produtos.every(function (p) { return Number.isSafeInteger(p.priceCents) && p.priceCents > 0; }));
conferir('Todos os produtos possuem descrição, categoria e imagem local',produtos.every(function (p) { return p.description && categorias.includes(p.category) && p.image.startsWith('/imagens/'); }));
let carrinhoTeste = {};
adicionarAoCarrinho(carrinhoTeste,'cabo25',1);
adicionarAoCarrinho(carrinhoTeste,'tomada10',1);
conferir('Dois produtos: R$ 199,80',somarCarrinho(carrinhoTeste) === 19980);
alterarQuantidade(carrinhoTeste,'cabo25',2);
conferir('Alterar quantidade atualiza total para R$ 389,70',somarCarrinho(carrinhoTeste) === 38970);
alterarQuantidade(carrinhoTeste,'tomada10',0);
conferir('Remover produto atualiza total para R$ 379,80',somarCarrinho(carrinhoTeste) === 37980 && !carrinhoTeste.tomada10);
alterarQuantidade(carrinhoTeste,'cabo25',0);
conferir('Última remoção retorna ao estado vazio',somarCarrinho(carrinhoTeste) === 0 && Object.keys(carrinhoTeste).length === 0);
for (const invalida of [-1,0.5,NaN,Infinity]) {
  conferir('Rejeita quantidade inválida: '+String(invalida),!adicionarAoCarrinho(carrinhoTeste,'cabo25',invalida) && !alterarQuantidade(carrinhoTeste,'cabo25',invalida));
}
conferir('Não adiciona quantidade zero ou ID desconhecido',!adicionarAoCarrinho(carrinhoTeste,'cabo25',0) && !adicionarAoCarrinho(carrinhoTeste,'inexistente',1));
adicionarAoCarrinho(carrinhoTeste,'cabo25',200);
conferir('Limita quantidade a 99',carrinhoTeste.cabo25 === 99);
conferir('Serialização e recuperação preservam o carrinho',iguais(limparCarrinho(JSON.parse(JSON.stringify(carrinhoTeste))),carrinhoTeste));
conferir('Limpa armazenamento corrompido',iguais(limparCarrinho({ cabo25:Infinity, tomada10:-1,painel:2.7,bipolar:500,inexistente:1 }),{ painel:2,bipolar:99 }));
conferir('Aceita armazenamento vazio',iguais(limparCarrinho(null),{}) && iguais(limparCarrinho([]),{}));
conferir('Formata preço em reais',moeda(19980).replace(/\s/g,' ') === 'R$ 199,80');
conferir('Busca ignora acentos e maiúsculas',iguais(filtrarProdutos({query:'LAMPADA'}).map(function(p){return p.id;}),['lampada']));
conferir('Combina categoria, marca e preço',iguais(filtrarProdutos({category:'tomadas-e-interruptores',brand:'Tramontina',maximum:1500}).map(function(p){return p.id;}),['tomada20']));
conferir('Ordena preço corretamente',filtrarProdutos({sort:'menor-preco'})[0].id === 'lampada' && filtrarProdutos({sort:'maior-preco'})[0].id === 'cabopp');
conferir('Busca sem resultado retorna lista vazia',filtrarProdutos({query:'produto-inexistente'}).length === 0);
conferir('Débito não parcela e não aplica desconto',iguais(calcularPagamento(19980,'debit',7).amounts,[19980]));
conferir('Pix aplica desconto de exemplo',calcularPagamento(19980,'pix',1).totalCents === 18981);
conferir('Pix preserva o preço anunciado no meio centavo',calcularPagamento(18990,'pix',1).totalCents === 18041);
conferir('Crédito de R$ 199,80 em 7 parcelas preserva os centavos',iguais(calcularPagamento(19980,'credit',7).amounts,[2855,2855,2854,2854,2854,2854,2854]));
let parcelasCorretas = true;
for (const total of [1,990,1499,19980,40950,1978020]) {
  for (let n = 1; n <= 10; n++) {
    const pagamento = calcularPagamento(total,'credit',n);
    let soma = 0;
    for (const parcela of pagamento.amounts) soma += parcela;
    if (soma !== total || !pagamento.amounts.every(Number.isSafeInteger)) parcelasCorretas = false;
  }
}
conferir('Todos os exemplos em 1–10 parcelas preservam o total',parcelasCorretas);
conferir('Corrige preferência inválida de pagamento',normalizarPagamento({method:'credit',installments:999}).installments === 10 && normalizarPagamento(null).method === 'debit');
conferir('Subtotal inválido não gera valor negativo',calcularPagamento(-1,'pix',1).totalCents === 0);
const clienteTeste = {name:'Cliente Exemplo',email:'cliente@example.com',phone:'(51) 99999-9999',cep:'93800-000',street:'Rua Exemplo',number:'100',district:'Centro',city:'Cidade Exemplo',state:'RS',delivery:'entrega'};
conferir('Aceita dados fictícios válidos',validarCliente(clienteTeste) === '');
conferir('Recusa nome incompleto',validarCliente({...clienteTeste,name:'Cliente'}).includes('sobrenome'));
conferir('Recusa e-mail inválido',validarCliente({...clienteTeste,email:'a@'}).includes('e-mail'));
conferir('Recusa telefone inválido',validarCliente({...clienteTeste,phone:'123'}).includes('telefone'));
conferir('Recusa CEP inválido',validarCliente({...clienteTeste,cep:'123'}).includes('CEP'));
conferir('Recusa endereço só com espaços',validarCliente({...clienteTeste,street:'   '}).includes('Espaços'));
conferir('Recusa estado inválido',validarCliente({...clienteTeste,state:'XX'}).includes('estado'));
conferir('Retirada dispensa endereço de entrega',validarCliente({...clienteTeste,delivery:'retirada',cep:'',street:''}) === '');
conferir('Escapa textos antes de inserção no HTML',textoSeguro('<script>"x"</script>') === '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');

if (typeof document !== 'undefined') {
  document.getElementById('resultado-testes').innerHTML = resultados.map(function (teste) { return '<p class="test-result '+(teste.aprovado?'test-pass':'test-fail')+'">'+(teste.aprovado?'PASSOU: ':'FALHOU: ')+textoSeguro(teste.nome)+'</p>'; }).join('');
  document.getElementById('resumo-testes').textContent = aprovados+' testes aprovados; '+reprovados+' reprovados.';
}
if (typeof console !== 'undefined') console.log(aprovados+' testes aprovados; '+reprovados+' reprovados.');
if (reprovados) throw new Error('Há testes de regras reprovados.');
