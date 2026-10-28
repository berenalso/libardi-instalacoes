const paginaInformacoes = document.body.dataset.pagina;
if (artigos[paginaInformacoes]) {
  let navegacao = '';
  for (const chave in artigos) navegacao += '<a href="/' + chave + '.html"' + (chave === paginaInformacoes ? ' aria-current="page"' : '') + '>' + textoSeguro(artigos[chave].title) + '</a>';
  document.getElementById('navegacao-artigos').innerHTML = navegacao + '<a href="/ajuda.html">Fale conosco</a>';
  document.getElementById('conteudo-artigo').innerHTML = artigos[paginaInformacoes].sections.map(function (secao) { return '<section><h2>' + textoSeguro(secao[0]) + '</h2><p>' + textoSeguro(secao[1]) + '</p></section>'; }).join('');
}
if (paginaInformacoes === 'privacidade') {
  document.getElementById('apagar-dados').addEventListener('click',function () {
    if (!window.confirm('Apagar carrinho, favoritos, tema e demonstrações salvas neste navegador?')) return;
    try {
      localStorage.removeItem(chaveLocal);
      window.location.reload();
    } catch (erro) { mostrarMensagem('O navegador não permitiu apagar os dados. Verifique as configurações de armazenamento.'); }
  });
}
if (paginaInformacoes === 'ajuda') {
  const perguntas = [
    ['Qual o prazo de entrega?','Nesta demonstração, frete e prazo não são calculados. Na operação real, dependerão do CEP, transportadora e estoque.'],
    ['Posso retirar o pedido na loja?','O checkout demonstra essa opção. Não há produto reservado ou retirada agendada.'],
    ['Como funciona a troca ou devolução?','Consulte a página de trocas e devoluções. Este site não processa compras, devoluções ou reembolsos.'],
    ['Quais formas de pagamento são aceitas?','Você pode simular cartão de débito, crédito em até 10 parcelas e Pix. Nenhuma transação é realizada; a cobrança real exige integração futura.'],
    ['Vocês emitem nota fiscal?','Esta versão não realiza vendas nem emite documentos fiscais.'],
    ['Como peço um orçamento de instalação?','Acesse Serviços e escolha Solicitar orçamento. O formulário atual somente valida os dados localmente.']
  ];
  document.getElementById('perguntas-frequentes').innerHTML = perguntas.map(function (pergunta) { return '<details><summary>' + pergunta[0] + '</summary><p>' + pergunta[1] + '</p></details>'; }).join('');
  const formulario = document.getElementById('form-contato');
  formulario.addEventListener('submit',function (evento) {
    evento.preventDefault();
    const dados = new FormData(formulario);
    let erro = '';
    if (String(dados.get('name')).trim().length < 3) erro = 'Informe seu nome.';
    else if (!String(dados.get('subject')).trim()) erro = 'Informe o assunto.';
    else if (String(dados.get('message')).trim().length < 10) erro = 'Escreva uma mensagem com pelo menos 10 caracteres.';
    document.getElementById('erro-contato').textContent = erro;
    document.getElementById('erro-contato').hidden = !erro;
    document.getElementById('sucesso-contato').hidden = Boolean(erro);
    if (!erro) formulario.reset();
  });
}
