# Relatório de testes — versão HTML, CSS e JavaScript

Verificação local da branch `versao-html-css-js`, em 28/10/2026. Estes resultados são da conversão, não dos antigos testes React/Vitest. Servido como arquivos estáticos por HTTP, sem compilador ou servidor de aplicação.

## Regras automatizadas sem bibliotecas

`testes/index.html`: **37 aprovados, 0 reprovados**, executados no navegador e também com o módulo nativo `vm` do Node apenas como verificação local opcional. O site não depende de Node.

Cobertura: 26 produtos com IDs únicos e preços positivos; carrinho com vários produtos; soma, aumento, remoção, limite 99; rejeição de negativos, zero na adição, frações, NaN, Infinity e IDs desconhecidos; limpeza e serialização de dados; moeda brasileira; busca/filtros/ordenação/resultado vazio; débito, Pix e crédito; soma exata das parcelas de 1 a 10 para diferentes valores; validações de cliente/endereço; escape de texto dinâmico.

Todos os arquivos em `js/` e `testes/*.js` passaram na verificação de sintaxe `node --check`. Não há etapa de build de produção porque os arquivos entregues já são os arquivos de produção. Não foram executados comandos npm/Vite/Vitest nesta versão.

## Fluxos exercitados no navegador

| Verificação | Evidência observada | Resultado |
|---|---|---|
| Carrinho com dois produtos | Cabo R$ 189,90 + tomada R$ 9,90 = R$ 199,80 | Passou |
| Aumentar quantidade | 2 cabos + tomada = R$ 389,70, atualizado imediatamente | Passou |
| Persistência | Recarregar manteve itens/quantidades e R$ 389,70 | Passou |
| Detalhe de produto | Selecionar 2 cabos e adicionar resultou em R$ 379,80 | Passou |
| Remoção e vazio | Remover o cabo exibiu carrinho vazio, mantido após reload | Passou |
| Campos obrigatórios | Tentativa vazia interrompida pela validação HTML (11 campos inválidos na entrega) | Passou |
| Telefone e espaços | Telefone curto e endereço só com espaços rejeitados; correção permitiu revisar | Passou |
| Entrega/retirada | Endereço completo aceito; retirada desativou campos de endereço | Passou |
| Débito | Confirmação `DEMO-MVRUPA1D`, dois produtos, R$ 199,80, método débito | Passou |
| Crédito/parcelamento | `DEMO-MVRUPQ6Q`: 2 × R$ 28,55 + 5 × R$ 28,54 = R$ 199,80 | Passou |
| Pix | `DEMO-MVRUQ1MN`: subtotal R$ 199,80, desconto R$ 9,99, total R$ 189,81 | Passou |
| Confirmação e histórico | Reload manteve confirmação; três simulações apareceram no histórico recarregado | Passou |
| Busca no cabeçalho | “lâmpada” abriu o catálogo com um resultado | Passou |
| Filtros combinados | “tomada” mostrou 3 produtos; máximo R$ 10 reduziu para 1 | Passou |
| Ordenação | Menor preço exibiu lâmpada R$ 6,90 antes do conector R$ 7,90 | Passou |
| Favoritos | Favoritar tomada, abrir lista, recarregar e remover até estado vazio | Passou |
| Mobile: filtros | Abrir mostrou `aria-expanded=true`; buscar tomada e “Ver 3 produtos” fechou com `false` | Passou |
| Mobile: compra | Botão Comprar → carrinho → checkout → revisão → `DEMO-MVRV7J3J`, R$ 9,90 no débito | Passou |
| Tema | Escuro aplicado no checkout mobile; outra aba recarregada manteve `data-theme=dark` | Passou |
| Serviços/orçamento | Dados fictícios válidos abriram confirmação sem envio/agendamento | Passou |
| Contato | Mensagem validada, confirmação explícita de que nada foi enviado | Passou |
| Cadastro | Senhas diferentes rejeitadas; iguais exibiram validação sem criar conta | Passou |

Os números DEMO são evidências locais de teste, não pedidos comerciais. Nenhum cartão, pagamento real ou mensagem externa foi utilizado.

## Responsividade e recursos

A ferramenta local `testes/responsividade.html` carregou 24 páginas comuns e 26 detalhes de produto, em cada uma das cinco larguras abaixo: **250 carregamentos**. Mediu `scrollWidth <= clientWidth`, carregamento das imagens (inclusive lazy, forçadas a carregar no teste), título principal e ausência de links vazios/`#`.

| Largura do iframe | Área útil após scrollbar | Telas verificadas | Falhas nesses indicadores |
|---:|---:|---:|---:|
| 320 | 305 | 50 | 0 |
| 390 | 375 | 50 | 0 |
| 430 | 415 | 50 | 0 |
| 768 | 753 | 50 | 0 |
| 1440 | 1425 | 50 | 0 |

Altura de referência do iframe: 932 pixels. Home desktop, Home mobile e checkout escuro foram inspecionados visualmente. Filtros, compra e checkout foram também clicados no iframe mobile. A matriz de telas não equivale a concluir pedidos em cada largura; checkout vazio é o estado da matriz inicial. O checkout preenchido e o carrinho com produto foram conferidos depois no fluxo mobile.

A inspeção estática encontrou **25 HTMLs, 10 scripts da loja, nenhuma referência local ausente, nenhum `.ts`/`.tsx` e nenhum `package.json`**. Resultado em `verificacao-arquivos.json`. Os logs consultados mostraram ruído de uma extensão do navegador; não foi observado erro dos scripts da loja nesses fluxos.

## Publicação e limites

O código foi enviado à branch solicitada. A `main` permanece sem merge. A Vercel leu `versao-html-css-js`, preset **Other**, comandos de instalação/build vazios e saída `.`. O deploy no projeto separado `libardi-instalacoes-html` parou em **Reauthenticate**, exigindo código enviado ao e-mail da conta.

**Até superar essa reautenticação, não há publicação desta versão nem teste de URL Vercel confirmado.** Depois do deploy é necessário verificar recursos, todos os documentos `.html`, rewrites das URLs antigas, reload de rotas e carrinho/checkout no domínio final. Não foi feita validação em aparelho físico.

A fidelidade visual usa o Figma e os estilos originais reaproveitados; não é uma comparação pixel a pixel de todas as telas. Há 25 fotos de produtos e um DPS com ilustração genérica identificada. Categorias sem produtos originais mostram estado vazio. A avaliação/apresentação do aluno e a nota final dependem do professor.
