# Guia de apresentação — versão HTML, CSS e JavaScript

## 1. O que apresentar

“A Libardi Instalações é uma loja demonstrativa de materiais elétricos e serviços. O projeto aplica HTML para estruturar, CSS para estilizar e JavaScript para reagir às ações do usuário. O visual segue o Figma original. Nenhuma compra ou mensagem é enviada de verdade.”

O projeto foi convertido a partir da versão existente. Logotipo, cores, imagens, 26 produtos e funcionalidades foram reaproveitados. A versão anterior continua na `main` e no histórico; a conversão está em uma branch para revisão.

## 2. Tecnologias e organização

HTML5: `main`, `header`, `nav`, `section`, `article`, `form`, `label` e botões dão significado ao conteúdo. Cada página tem seu próprio arquivo `.html`. Os campos do checkout estão no próprio `checkout.html`.

CSS3: `css/estilos.css` controla cores, fontes locais, espaçamentos, grades, Flexbox, estados de foco e media queries. Não existe Tailwind.

JavaScript: arquivos `.js` normais, carregados com `defer` na ordem dados → regras → loja → script da página. `defer` permite esperar o HTML ser lido antes de acessar os elementos. Não há React, roteador, TypeScript ou compilador.

`js/dados.js` contém arrays de objetos. Cada produto tem ID, nome, imagem, categoria, preço em centavos e especificações. Um array é uma lista; um objeto reúne propriedades do mesmo item. O ID permite localizar um produto com `buscarProduto(id)`.

`js/regras.js` contém funções que recebem dados e devolvem resultados. `js/loja.js` guarda os dados compartilhados, monta cabeçalho/rodapé e registra eventos. Os scripts das páginas usam essas funções para atualizar o DOM. DOM é a representação do HTML que o JavaScript consegue ler e alterar.

## 3. Carrinho e eventos

O carrinho é um objeto: `{ cabo25: 2, tomada10: 1 }`. As chaves são IDs; os valores são quantidades. Não é necessário duplicar nome e preço, pois essas informações já estão no catálogo.

Ao clicar em um botão `data-adicionar`, o evento `click` chega ao listener de `js/loja.js`. `adicionarAoCarrinho` verifica se o produto existe e se a quantidade é um inteiro positivo, atualiza o objeto e limita a 99. `salvarEstado()` grava a alteração e atualiza o contador do cabeçalho. A página do carrinho também redesenha os itens e totais após cada mudança.

Em `js/carrinho.js`, os botões de mais/menos chamam `alterarQuantidade`. O botão de lixeira remove a propriedade do objeto. Quantidade zero remove o item; valores inválidos são recusados. Sem itens, aparece uma mensagem e um link para o catálogo.

Exemplo de evento do código: `addEventListener('click', function (evento) { ... })`. O navegador chama a função quando acontece o clique. `closest` identifica o botão mesmo se o clique ocorrer no ícone interno.

## 4. Cálculo dos valores

R$ 189,90 é armazenado como `18990`. Trabalhar com centavos inteiros evita somar valores decimais imprecisos. `somarCarrinho` percorre os IDs com um laço `for`, encontra o produto, multiplica preço por quantidade e soma os subtotais.

Exemplo: 2 cabos de R$ 189,90 + 1 tomada de R$ 9,90 = 2 × 18990 + 990 = 38970 centavos = **R$ 389,70**. `moeda` usa `Intl.NumberFormat('pt-BR', ...)` para apresentar reais.

O frete não é calculado na demonstração; o total informado corresponde aos produtos, após eventual desconto Pix. A interface informa isso.

## 5. Checkout e validação

O HTML usa `required`, `type="email"`, limites de tamanho e labels. O navegador impede enviar campos obrigatórios vazios e e-mail malformado. Em seguida `validarCliente` verifica nome, telefone com DDD, CEP, endereço e UF. Espaços em branco não contam como endereço. Para retirada, os campos de endereço ficam desativados.

`js/checkout.js` apresenta resumo, permite escolher pagamento e exibe uma revisão antes de concluir. Só depois da revisão, gera um número fictício `DEMO-...`, salva os produtos/valor/método/data no histórico local e limpa o carrinho. A confirmação também funciona após recarregar.

Nome, telefone, e-mail e endereço existem apenas temporariamente no formulário/revisão. O histórico não armazena esses dados. Esta demonstração não consulta servidor ou banco de dados.

## 6. Pagamentos simulados

Débito: uma parcela, total dos produtos, sem campos financeiros.

Crédito: escolha de 1 a 10 parcelas sem juros. O script divide o total em centavos inteiros. Se sobrar um centavo, ele vai para as primeiras parcelas. Para R$ 199,80 em 7 vezes: **2 × R$ 28,55 + 5 × R$ 28,54 = R$ 199,80**. Não arredondamos todas para R$ 28,54 porque faltariam dois centavos.

Pix: desconto fictício de 5%, arredondado para o centavo. Em R$ 199,80, o desconto é R$ 9,99 e o total R$ 189,81. A tela explica que não existe QR Code, cobrança ou transferência.

`calcularPagamento` é a mesma função usada no resumo, confirmação e testes. `normalizarPagamento` restringe método e número de parcelas. Nada solicita número de cartão, CVV ou senha bancária.

## 7. Busca e filtros

O formulário do cabeçalho abre `catalogo.html?q=...`. `URLSearchParams` lê os parâmetros. `filtrarProdutos` usa condicionais para verificar texto, categoria, marca e preço, e `sort` para ordenar. `normalizar` permite encontrar “lâmpada” digitando “lampada”.

`js/catalogo.js` lê `FormData` a cada evento de filtro e coloca os cards encontrados no DOM. `history.replaceState` apenas atualiza a consulta da página atual, sem um roteador. Links entre páginas são links HTML comuns.

## 8. LocalStorage e temas

`LocalStorage` armazena texto no navegador, por domínio. `JSON.stringify` transforma o objeto em texto; `JSON.parse` recupera o objeto. `lerEstado` usa `try/catch` e limpa IDs/quantidades inválidos para evitar quebrar a página se os dados estiverem corrompidos.

A chave `libardi:v1` foi preservada da versão anterior. Ela guarda carrinho, favoritos, tema e até 20 pedidos demonstrativos. O evento `storage` sincroniza as mudanças entre abas da mesma origem. Outro domínio não compartilha esses dados.

O botão de tema altera o atributo `data-theme` do documento. No CSS, variáveis como `--bg`, `--panel` e cores de texto mudam conforme o tema. O layout é o mesmo. O tema escolhido é salvo para a próxima visita.

## 9. Responsividade

`meta viewport` adapta a largura ao dispositivo. Grades e Flexbox organizam desktop; media queries reorganizam colunas, formulário, cards e resumo em telas estreitas. No mobile aparecem navegação inferior, busca adaptada e botão para abrir/fechar os filtros. Há espaço inferior para o menu fixo não cobrir o conteúdo.

O Figma usa aproximadamente 430 × 932 como referência. A verificação local também inclui 320, 390, 768 e 1440 pixels. Emulador por iframe não substitui testar em um aparelho físico; o relatório distingue o que foi medido do que foi clicado.

## 10. GitHub e Vercel

Git registra versões reais. Uma branch permite melhorar o código sem alterar a principal. Um commit é um registro de mudanças com mensagem. O Pull Request compara `versao-html-css-js` com `main` e permite revisar antes de mesclar.

Fluxo para novas alterações: `git switch versao-html-css-js`, editar, verificar, `git add`, `git commit -m "Explica a mudança"`, `git push`. Não coloque senhas no código. Só mescle o PR com aprovação.

A Vercel serve os próprios arquivos. Selecione **Other**, raiz do repositório, sem instalação/build, saída `.`. `vercel.json` mantém links antigos e configura a hospedagem. Não precisa de React, Vite, Node ou npm para executar o site publicado. No projeto separado, Settings → Environments → Production → Branch Tracking usa `versao-html-css-js`; assim cada commit nessa branch atualiza a publicação sem alterar a principal. Consulte o README para o passo a passo.

## Roteiro de demonstração prática (8 a 10 minutos)

1. Abra a Home e mostre logo, cores, categorias, produtos e alternância de tema. Recarregue para mostrar o tema salvo.
2. Abra o catálogo, busque “tomada” e limite o preço máximo a R$ 10. Mostre o resultado e limpe os filtros. Ordene por menor preço.
3. Favorite um produto, abra Favoritos, recarregue e remova-o.
4. Adicione um cabo de R$ 189,90 e uma tomada de R$ 9,90. Mostre R$ 199,80 no carrinho. Aumente o cabo para duas unidades e explique R$ 389,70. Recarregue, remova a tomada, depois volte a uma unidade.
5. Vá ao checkout. Tente revisar vazio e explique a validação. Preencha apenas dados fictícios. Mostre entrega e retirada.
6. Selecione débito, crédito (7 parcelas) e Pix, explicando o cálculo. Revise e conclua uma simulação. Mostre número `DEMO`, produtos, total e método. Repita com os outros métodos se houver tempo.
7. Abra os pedidos demonstrativos e seus detalhes. Explique que não há compra real. Mostre Serviços e a validação de um orçamento.
8. Reduza a janela para mobile. Mostre navegação inferior, abrir/fechar filtros, carrinho e checkout.
9. No editor, mostre um formulário HTML, uma media query CSS e as funções `somarCarrinho`, `calcularPagamento`, `salvarEstado`. Abra `/testes/index.html`.
10. Termine no GitHub: branch, commits e [PR #1](https://github.com/berenalso/libardi-instalacoes/pull/1). Abra o [site estático publicado](https://libardi-instalacoes-html.vercel.app/) e explique que o projeto separado acompanha `versao-html-css-js`, sem mesclar na `main`.

## Perguntas prováveis

**Onde fica o banco de dados?** Não há banco; é uma atividade frontend. O navegador guarda só o estado demonstrativo.

**O que acontece se eu limpar o navegador?** Carrinho, favoritos e histórico local desaparecem. A página de privacidade permite limpar os dados da loja.

**Por que páginas separadas?** Para usar HTML comum, facilitar a localização do conteúdo e dispensar roteador/framework.

**O que é preciso para vender de verdade?** Um servidor, autenticação, estoque, cálculo de frete e um provedor de pagamentos. Isso não faz parte deste trabalho.

**Por que não garantir 14 pontos?** O relatório oferece evidências para os 11 critérios. A nota depende da avaliação do professor, inclusive da apresentação do aluno.
