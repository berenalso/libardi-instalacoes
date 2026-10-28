# Guia de estudo e apresentação — Libardi Instalações

O professor pede que você explique o código e demonstre a loja. Use este guia para estudar e praticar com suas próprias palavras. A autoria e o uso de ferramentas de apoio devem ser apresentados com transparência; não basta decorar uma fala.

## Roteiro de demonstração

1. Apresente a proposta: materiais elétricos e serviços de instalação com a identidade Libardi.
2. Mostre a Home, as categorias e os temas claro e escuro.
3. Busque `LAMPADA`, sem acento, e explique por que a busca encontra a lâmpada.
4. Abra o cabo de 2,5 mm² e mostre imagem, descrição, especificações e produtos relacionados.
5. Adicione um cabo e uma tomada de 10 A. O subtotal é R$ 199,80.
6. Aumente o cabo para duas unidades: subtotal de R$ 389,70. Remova a tomada: R$ 379,80.
7. Atualize a página e mostre que o carrinho continua salvo.
8. No checkout, use dados fictícios. Mostre a mensagem de erro de um telefone inválido e depois corrija.
9. Escolha débito: pagamento à vista, sem desconto. Troque para crédito e selecione sete parcelas. A soma deve preservar o valor total.
10. Troque para Pix e mostre o desconto de exemplo. Explique que não existe QR Code real ou transferência.
11. Revise os dados e conclua a simulação. Mostre a mensagem de sucesso e o histórico local.
12. Demonstre favoritos e o layout mobile.
13. Mostre o README, os principais arquivos e o histórico do Git. Quando o GitHub estiver publicado, abra também o link do repositório.

## Como as tecnologias entram no projeto

- HTML: `index.html` carrega a aplicação. Os componentes JSX geram elementos como `main`, `header`, `nav`, `form`, `label`, `input` e `button` no navegador.
- CSS: `src/styles.css` define cores, fontes, espaçamentos, grids, foco acessível e mudanças de layout por tamanho de tela. As variáveis CSS permitem usar o mesmo componente em dois temas.
- JavaScript: a lógica é escrita em TypeScript, que acrescenta tipos. O Vite gera JavaScript executável pelo navegador no build.
- React: divide a interface em componentes e atualiza a tela quando o estado muda.
- React Router: relaciona URLs a páginas sem recarregar o documento inteiro durante a navegação interna.
- Git: registra alterações e permite consultar versões. GitHub hospeda o repositório para que o professor consiga acessá-lo.

O enunciado permite bibliotecas e frameworks se você souber explicar sua utilização.

## Arquivos principais para estudar

| Arquivo | O que explicar |
| --- | --- |
| `index.html` | Idioma, viewport, ponto de montagem e entrada da aplicação |
| `src/main.tsx` | Providers, rotas e tratamento de erro de renderização |
| `src/data/products.json` | Lista de objetos com ID, nome, preço, categoria, descrição e imagem |
| `src/components/UI.tsx` | Cards, imagens, favoritos e controle de quantidade reutilizados |
| `src/pages/Shop.tsx` | Home, catálogo, busca/filtros e página de produto |
| `src/hooks/Store.tsx` | Estado compartilhado e gravação no LocalStorage |
| `src/services/catalog.ts` | Busca, filtros, normalização do carrinho e cálculo do total |
| `src/services/payment.ts` | Desconto Pix e divisão das parcelas em centavos |
| `src/components/PaymentChoices.tsx` | Radio buttons, seleção do parcelamento e prévia dos valores |
| `src/pages/Checkout.tsx` | Formulário, validação, revisão e conclusão da simulação |
| `src/styles.css` | Tokens de tema, flex/grid, media queries e navegação mobile |
| `vercel.json` | Configuração de build e carregamento direto de rotas |

## Carrinho: qual estrutura é usada?

O carrinho é um objeto que associa o ID de cada produto à sua quantidade:

```js
{ cabo25: 2, tomada10: 1 }
```

O produto completo fica no catálogo. O ID permite encontrar o nome, o preço e a imagem sem repetir esses dados no carrinho.

`add` adiciona ou aumenta um item. `quantity` altera sua quantidade; quando recebe zero, remove o item. O limite demonstrativo é de 99 unidades por produto. O operador spread cria um novo objeto para o React reconhecer a mudança de estado.

## Por que calcular em centavos?

O preço R$ 189,90 é armazenado como `18990`, um número inteiro. Isso evita depender de somas de decimais como `0.1 + 0.2`, que podem ter pequenas imprecisões em JavaScript.

`Object.entries` transforma o objeto do carrinho em pares `[id, quantidade]`. `reduce` percorre esses pares acumulando `preço × quantidade`. `Intl.NumberFormat` transforma o valor final em texto no formato brasileiro.

## Como o Pix funciona?

`calculatePayment` calcula o total com desconto demonstrativo de 5%. Arredonda o total final para centavos e obtém o desconto pela diferença, mantendo o mesmo valor anunciado nos cards. Não existe pagamento real.

## Como o parcelamento evita perder centavos?

O total é dividido pelo número de parcelas. A parte inteira vai para todas as parcelas, e os centavos restantes são distribuídos um a um nas primeiras parcelas.

Por exemplo, R$ 199,80 em sete parcelas resulta em duas parcelas de R$ 28,55 e cinco de R$ 28,54. A soma continua sendo R$ 199,80.

## Por que os dados continuam após recarregar?

`useEffect` grava carrinho, favoritos, tema e referências de demonstrações no `localStorage`. `JSON.stringify` transforma o objeto em texto; `JSON.parse` recupera os objetos ao abrir a aplicação. Um `try/catch` trata JSON inválido e indisponibilidade de armazenamento.

Nome, telefone, endereço e senha não são gravados por esses formulários. Eles usam somente o estado temporário da página. O LocalStorage não substitui um banco de dados ou uma autenticação segura.

## Como funciona a busca sem acentos?

A função `normalize` converte o texto para minúsculas e remove marcas de acentuação. Assim, `LAMPADA` e `Lâmpada` podem ser comparadas com `includes`.

`filter` seleciona os produtos que passam pelos critérios. `sort` organiza os resultados com uma comparação numérica de preços ou avaliações.

## Perguntas para praticar

- Qual a diferença entre uma variável e um estado do React?
- Por que o carrinho usa IDs?
- O que `map`, `filter` e `reduce` fazem neste projeto?
- O que muda quando você troca a forma de pagamento?
- O que acontece quando o total não pode ser dividido igualmente em centavos?
- Por que `localStorage` não deve guardar senhas?
- Qual a diferença entre frontend demonstrativo e uma loja com backend?
- Como uma media query muda o layout?
- O que um commit registra? Como você consulta seu histórico?

Antes de apresentar, tente responder sem ler o guia e altere um texto ou um estilo simples para conferir que entendeu onde cada parte está.

## Organização das pastas em palavras simples

A pasta `public/assets` guarda imagens servidas pelo site. Em `src/data`, cada produto é um objeto, como uma linha de uma tabela. `src/types` define os formatos desses objetos. `src/services` concentra regras de cálculo e validação sem desenhar telas. `src/components` guarda peças reutilizadas, enquanto `src/pages` combina essas peças para cada URL. `src/hooks/Store.tsx` compartilha carrinho, favoritos, tema e histórico entre páginas. `docs` registra referências e resultados. `qa/index.html` é um auxiliar de teste local; o build normal inclui somente `index.html` e não publica esse auxiliar.

## Eventos e estados: acompanhe um clique

No botão de compra, `onClick={() => store.add(product.id)}` é um evento. Quando alguém clica, a função `add` chama `setCart`. O React percebe o novo objeto do carrinho e atualiza tanto os itens quanto o contador do cabeçalho. Isso é estado compartilhado: páginas diferentes consultam a mesma fonte de dados.

A regra pura `addCartItem` rejeita quantidades negativas, fracionárias ou não finitas. `setCartQuantity` também rejeita entradas inválidas; zero significa remover e valores inteiros acima de 99 são limitados a 99. Os botões impedem diminuir abaixo de 1 e aumentar acima de 99. Os testes exercitam as regras diretamente, além dos testes de cliques no navegador.

```ts
// Forma simplificada da mesma lógica de catalog.ts:
const total = Object.entries(cart).reduce(
  (soma, [id, quantidade]) => soma + productById(id)!.priceCents * quantidade,
  0,
);
```

`reduce` começa em zero e acrescenta o subtotal de cada produto. O `!` informa ao TypeScript que o produto existe; a aplicação limpa IDs desconhecidos antes de calcular.

## Checkout e confirmação

O formulário mantém um objeto temporário `data` no estado. Cada `onChange` atualiza um campo; `onSubmit` impede o envio padrão com `preventDefault`. O navegador verifica campos obrigatórios e e-mail; `validateCustomer` também valida nome e sobrenome, telefone, CEP, estado e endereço sem campos contendo só espaços. Entrega em endereço aparece por padrão; retirada continua disponível.

Depois da validação, a interface muda para revisão. O botão Editar retorna ao formulário. Concluir cria uma referência `DEMO-...`, salva somente produtos, quantidades, método e total no histórico local e esvazia o carrinho. Não salva nome, telefone, e-mail ou endereço. `OrderSummary.tsx` exibe esses dados da simulação. A URL contém a referência fictícia, então a confirmação pode ser reaberta após recarregar no mesmo navegador. Sem uma referência válida, a tela informa que não há demonstração encontrada.

Débito usa uma parcela e nenhum desconto. Crédito oferece 1–10 parcelas sem juros fictícios. Pix usa 5% de desconto de exemplo. Nenhuma opção pede número de cartão, CVV, credenciais bancárias ou gera um QR Code válido.

## Responsividade

O HTML inclui `meta viewport` para o celular usar sua largura real. CSS Grid organiza categorias e produtos em colunas. Flexbox distribui botões e ações. `@media (max-width: 767px)` muda cabeçalho, grades, formulários e mostra a navegação inferior. Na faixa de tablet, outras regras ajustam colunas e espaçamentos. `minmax(0, 1fr)` permite que colunas encolham sem estourar o contêiner.

O celular usa duas colunas para produtos, formulários em uma coluna e botões confortáveis ao toque. A área inferior usa `env(safe-area-inset-bottom)` para respeitar a área segura de aparelhos compatíveis. O site não desenha a barra de status do iPhone dentro da página.

## Alternância de temas

`ThemeButton` chama `setTheme`. Um `useEffect` aplica `data-theme="dark"` ou `data-theme="light"` no elemento `html` e grava a preferência. A mesma classe de card usa variáveis como `--surface` e `--ink`; o CSS troca os valores sem duplicar a página.

| Token | Claro | Escuro |
| --- | --- | --- |
| Fundo | `#F4F6F8` | `#12161B` |
| Card | `#FFFFFF` | `#1C1F24` |
| Superfície secundária | `#F4F6F8` | `#263544` |
| Texto principal | `#1C1F24` | `#FFFFFF` |
| Destaque | `#F5C400` | `#F5C400` |

## Git, GitHub e Vercel

Git registra versões localmente; GitHub guarda o repositório na internet; Vercel compila e serve o site. São três funções diferentes. `git status` mostra mudanças, `git diff` compara arquivos e `git log --oneline` mostra commits reais. Os commits desta revisão registram o trabalho já feito, sem simular datas ou criar um histórico fictício.

No computador do aluno, o caminho normal é instalar com `npm ci`, executar `npm test` e `npm run build`, registrar alterações com `git add`/`git commit` e enviar pelo `git push`. O destino precisa ser um repositório existente, autorizado e inspecionado. Não coloque senhas no código ou no comando.

Na Vercel, importe o repositório, escolha Vite, instale com `npm ci`, compile com `npm run build` e use a pasta `dist`. Esta versão não precisa de variáveis de ambiente. `vercel.json` faz uma URL como `/produto/cabo25` carregar o documento principal; então o React Router escolhe a tela correta. Após publicar, é necessário abrir e recarregar as rotas no endereço final. Até isso acontecer, não apresente a publicação como concluída.

## Roteiro de apresentação em 8–10 minutos

| Tempo | Demonstração | Conceito a explicar |
| --- | --- | --- |
| 0–1 min | Home, categorias, identidade e objetivo escolar | Componentes e HTML semântico |
| 1–2 min | Busca LAMPADA, filtros e ordenação | `normalize`, `filter` e `sort` |
| 2–4 min | Cabo R$ 189,90 + tomada R$ 9,90; aumentar, diminuir e remover | Estado, eventos e soma em centavos |
| 4–5 min | Recarregar o carrinho e mostrar favoritos | JSON e LocalStorage |
| 5–7 min | Preencher dados fictícios, testar erro e mostrar débito, crédito 7x e Pix | Validação e parcelas exatas |
| 7–8 min | Concluir demonstração e reabrir o resumo | Histórico local e ausência de transação real |
| 8–9 min | Mobile, filtros e alternância de temas | Media queries e variáveis CSS |
| 9–10 min | Mostrar testes, arquivos e histórico Git | Build, versionamento e hospedagem |

Para a demonstração do endereço, use Cliente Exemplo, `cliente@example.com`, `(51) 99999-9999`, Rua Exemplo, 100, Centro, Cidade Exemplo/RS e CEP `93800-000`. Esses dados são fictícios. Antes da aula, ensaie sem depender do guia e confira se o professor consegue acessar o repositório e o endereço publicado.
