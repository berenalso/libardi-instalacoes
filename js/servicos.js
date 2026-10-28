const paginaServicos = document.body.dataset.pagina;
if (paginaServicos === 'servicos') {
  const icones = ['zap','building-2','wrench','layout-grid','lightbulb','shield-check'];
  document.getElementById('lista-servicos').innerHTML = servicos.map(function (servico,i) {
    return '<article class="panel service-card">' + icone(icones[i],32) + '<h2>' + textoSeguro(servico.name) + '</h2><p>' + textoSeguro(servico.description) + '</p><strong>' + textoSeguro(servico.price) + '</strong><a class="button primary" href="/orcamento.html?servico=' + encodeURIComponent(servico.name) + '">Solicitar orçamento</a></article>';
  }).join('');
}
if (paginaServicos === 'orcamento') {
  const formulario = document.getElementById('form-orcamento');
  const selecionado = new URLSearchParams(window.location.search).get('servico');
  for (const servico of servicos) document.getElementById('servico').add(new Option(servico.name,servico.name));
  if (servicos.some(function (servico) { return servico.name === selecionado; })) document.getElementById('servico').value = selecionado;
  document.getElementById('data-servico').min = new Intl.DateTimeFormat('en-CA',{ timeZone: 'America/Sao_Paulo' }).format(new Date());
  formulario.addEventListener('submit',function (evento) {
    evento.preventDefault();
    const dados = new FormData(formulario);
    let erro = '';
    if (String(dados.get('name')).trim().length < 3) erro = 'Informe seu nome.';
    else if (!/^[\d\s()+.-]+$/.test(String(dados.get('phone'))) || !/^\d{10,11}$/.test(String(dados.get('phone')).replace(/\D/g,''))) erro = 'Informe um telefone válido com DDD.';
    else if (!/^\d{5}-?\d{3}$/.test(String(dados.get('cep')).trim())) erro = 'Informe um CEP com 8 dígitos.';
    else if (String(dados.get('address')).trim().length < 5) erro = 'Informe o endereço do serviço.';
    else if (String(dados.get('description')).trim().length < 15) erro = 'Descreva sua necessidade com pelo menos 15 caracteres.';
    document.getElementById('erro-orcamento').hidden = !erro;
    document.getElementById('erro-orcamento').textContent = erro;
    if (!erro) window.location.href = '/orcamento-concluido.html';
  });
}
