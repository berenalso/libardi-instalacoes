# Inventário do Figma — Libardi Instalações

Inspeção somente leitura em 27/10/2026. Arquivo original preservado.

Fonte: https://www.figma.com/design/J8MjYIF1QaSxj94qUcMb8s/Libardi-Instala%C3%A7%C3%B5es?node-id=0-1

## Estrutura

A página Identidade Visual contém fundações, componentes e versões anteriores. A página Site contém a evolução atual desktop/mobile e os temas Claro/Escuro por variáveis. Os frames de revisão são documentação de projeto, não rotas da loja.

## Correspondência funcional

| Família de telas | Implementação |
| --- | --- |
| Home desktop/mobile | `/` |
| Categorias (5) | `/categoria/:category` |
| Produtos (26) | `/produto/:id` |
| Pesquisa e sugestões | `/pesquisa`, `/catalogo?q=...` |
| Resultados e cinco ordenações | `/catalogo?ordem=...` |
| Filtros e menu | `/catalogo`, `/explorar` |
| Carrinho e estado vazio | `/carrinho` |
| Checkout e conclusão | `/checkout`, `/checkout/concluido` |
| Favoritos e estado vazio | `/favoritos` |
| Conta, login, cadastro | `/perfil`, `/login`, `/cadastro` |
| Pedidos e oito estados | `/pedidos`, `/pedidos/:id`, `/pedidos/exemplo` |
| Serviços e orçamento | `/servicos`, `/orcamento`, `/orcamento/concluido` |
| Ajuda e páginas institucionais | `/ajuda`, `/sobre`, `/trocas`, `/privacidade`, `/termos` |
| Erro 404 | Qualquer rota inexistente |
| Ofertas (versão anterior) | `/ofertas` direciona ao catálogo por menor preço |

## Decisões da implementação

- Fonte de referência atual: página Site; não copiar versões históricas conflitantes.
- Mobile com base nos frames 430 × 932; barra de status e ilha do iPhone pertencem ao dispositivo e não são desenhadas na página web.
- Temas por tokens globais com preferência persistida.
- Quatro fotos de produtos estavam disponíveis: cabo25, tomada10, bipolar e painel. Para atender à atividade escolar, foram acrescentadas 21 fotos externas e uma ilustração genérica de DPS identificada, sem alterar o Figma.
- Logotipo e ilustração do banner foram exportados do Figma.
- Lucide React para ícones, conforme a preferência tecnológica do pedido.
- Conta, envio de formulários e checkout são demonstrativos. O acompanhamento explica oito estados sem confirmar pagamentos nem movimentar compras.
- Conteúdo institucional foi ajustado à operação efetiva desta demonstração, evitando garantias, métricas comerciais e promessas de atendimento fictícias.

## Frames inspecionados na página Site

### Desktop — Claro e Escuro / temas por variáveis

| ID | Nome | Dimensão |
| --- | --- | --- |
| `24:662` | Home | 1440 × 2069 |
| `93:16060` | Categoria / Fios e cabos | 1440 × 1874 |
| `93:16379` | Categoria / Tomadas e interruptores | 1440 × 1874 |
| `93:16698` | Categoria / Iluminação | 1440 × 1874 |
| `93:17017` | Categoria / Disjuntores e quadros | 1440 × 1874 |
| `93:17336` | Categoria / Ferramentas e acessórios | 1440 × 1874 |
| `93:17691` | Produto / cabo15 / Cabo flexível SIL 1,5 mm² preto — 100 m | 1440 × 2016 |
| `93:17970` | Produto / cabo25 / Cabo flexível 2,5 mm² azul — 100 m | 1440 × 2016 |
| `93:18249` | Produto / cabo4 / Cabo flexível SIL 4 mm² vermelho — 100 m | 1440 × 2016 |
| `93:18528` | Produto / cabopp / Cabo PP Cobrecom 3 × 2,5 mm² preto — 50 m | 1440 × 2016 |
| `93:18807` | Produto / paralelo / Fio paralelo Megatron 2 × 1,5 mm² branco — 100 m | 1440 × 2016 |
| `93:19086` | Produto / tomada10 / Tomada 2P+T 10 A branca — módulo | 1440 × 2016 |
| `93:19365` | Produto / tomada20 / Tomada Tramontina Liz 2P+T 20 A branca | 1440 × 2016 |
| `93:19644` | Produto / simples / Interruptor simples Pial Plus+ 10 A branco | 1440 × 2016 |
| `93:19923` | Produto / duplo / Interruptor duplo Tramontina Liz 10 A branco | 1440 × 2016 |
| `93:20202` | Produto / conjunto / Conjunto Soprano Revitá interruptor + tomada 10 A | 1440 × 2016 |
| `93:20481` | Produto / lampada / Lâmpada LED Taschibra TKL 60 9 W 6500 K | 1440 × 2016 |
| `93:20760` | Produto / painel / Painel LED de embutir 18 W 6500 K | 1440 × 2016 |
| `93:21039` | Produto / spot / Spot LED Avant de embutir redondo 7 W 6500 K | 1440 × 2016 |
| `93:21318` | Produto / refletor / Refletor Blumenau LED Tech Pro 50 W preto | 1440 × 2016 |
| `93:21597` | Produto / luminaria / Luminária Avant Slim de sobrepor 18 W — 50 cm | 1440 × 2016 |
| `93:21876` | Produto / mono / Disjuntor Eletromar monopolar DIN C16 — 16 A | 1440 × 2016 |
| `93:22155` | Produto / bipolar / Disjuntor bipolar DIN C32 — 32 A | 1440 × 2016 |
| `93:22434` | Produto / quadro / Quadro Steck Ouro Box 12 módulos DIN — embutir | 1440 × 2016 |
| `93:22713` | Produto / dr / Dispositivo DR Soprano DRS-L bipolar 63 A 30 mA | 1440 × 2016 |
| `93:22992` | Produto / dps / DPS Tekle classe II 20 kA 275 V — 1 polo | 1440 × 2016 |
| `93:23271` | Produto / alicate / Alicate universal Tramontina 8″ isolado 1000 V | 1440 × 2016 |
| `93:23550` | Produto / chave / Chave de fenda Tramontina VDE 6 × 100 mm | 1440 × 2016 |
| `93:23829` | Produto / multimetro / Multímetro digital Minipa ET-1002 portátil | 1440 × 2016 |
| `93:24108` | Produto / fita / Fita isolante 3M Highland preta — 19 mm × 20 m | 1440 × 2016 |
| `93:24387` | Produto / caixa / Caixa de passagem Mondiale PVC — 10 × 10 cm | 1440 × 2016 |
| `93:24666` | Produto / conector / Conector WAGO 221-413 de alavanca — 3 vias | 1440 × 2016 |
| `95:15482` | Carrinho / interativo | 1440 × 1269 |
| `97:15614` | Checkout / demonstração | 1440 × 1406 |
| `97:15941` | Checkout / simulação concluída | 1440 × 849 |
| `105:16059` | Explorar / produtos, serviços e conta | 1440 × 1250 |
| `106:16197` | Revisão / etapa anterior — histórico | 1280 × 2218 |
| `115:17059` | Pesquisa / sugestões | 1440 × 1211 |
| `115:17218` | Favoritos / lista e estado vazio | 1440 × 1232 |
| `115:18388` | Resultados / Menor preço | 1440 × 4703 |
| `115:19538` | Resultados / Maior preço | 1440 × 4703 |
| `115:20688` | Resultados / Mais vendidos | 1440 × 4703 |
| `115:21838` | Resultados / Melhor avaliados | 1440 × 4703 |
| `115:22988` | Resultados / Novidades | 1440 × 4703 |
| `116:22287` | Filtros / painel | 1440 × 2287 |
| `116:22585` | Perfil / conta demonstrativa | 1440 × 1053 |
| `116:22736` | Pedidos / meus pedidos | 1440 × 1107 |
| `116:22885` | Conta / login | 1440 × 1001 |
| `116:23040` | Conta / cadastro | 1440 × 1171 |
| `116:23203` | Serviços / instalações elétricas | 1440 × 900 |
| `116:23441` | Pedido / Pedido realizado | 1440 × 1679 |
| `116:23741` | Pedido / Pagamento confirmado | 1440 × 1679 |
| `116:24041` | Pedido / Preparando pedido | 1440 × 1679 |
| `116:24341` | Pedido / Pedido enviado | 1440 × 1679 |
| `116:24641` | Pedido / Saiu para entrega | 1440 × 1679 |
| `116:24941` | Pedido / Entregue | 1440 × 1679 |
| `116:25241` | Pedido / Pedido cancelado | 1440 × 1679 |
| `116:25541` | Pedido / Aguardando pagamento | 1440 × 1679 |
| `135:35294` | Revisão / Mobile iPhone 15 Pro Max e temas / 26 out 2026 | 1280 × 3508 |

### Mobile 430 × 932 — Claro e Escuro / temas por variáveis

| ID | Nome | Dimensão |
| --- | --- | --- |
| `121:24532` | Mobile / Home | 430 × 932 |
| `121:24715` | Mobile / Menu e categorias | 430 × 932 |
| `121:24796` | Mobile / Pesquisa / sugestões | 430 × 932 |
| `121:24872` | Mobile / Perfil | 430 × 932 |
| `121:24946` | Mobile / Login | 430 × 932 |
| `121:25020` | Mobile / Cadastro | 430 × 932 |
| `121:25102` | Mobile / Serviços | 430 × 932 |
| `122:25048` | Mobile / Categoria / Fios e cabos | 430 × 932 |
| `122:25256` | Mobile / Categoria / Tomadas e interruptores | 430 × 932 |
| `122:25463` | Mobile / Categoria / Iluminação | 430 × 932 |
| `122:25670` | Mobile / Categoria / Disjuntores e quadros | 430 × 932 |
| `122:25877` | Mobile / Categoria / Ferramentas e acessórios | 430 × 932 |
| `122:26112` | Mobile / Resultados / Menor preço | 430 × 932 |
| `122:26923` | Mobile / Resultados / Maior preço | 430 × 932 |
| `122:27734` | Mobile / Resultados / Mais vendidos | 430 × 932 |
| `122:28545` | Mobile / Resultados / Melhor avaliados | 430 × 932 |
| `122:29356` | Mobile / Resultados / Novidades | 430 × 932 |
| `123:29466` | Mobile / Filtros | 430 × 932 |
| `123:29678` | Mobile / Favoritos | 430 × 932 |
| `124:29591` | Mobile / Carrinho | 430 × 932 |
| `124:30140` | Mobile / Confirmação do pedido | 430 × 932 |
| `124:30208` | Mobile / Checkout | 430 × 932 |
| `124:30447` | Mobile / Produto / cabo15 | 430 × 932 |
| `124:30605` | Mobile / Produto / cabo25 | 430 × 932 |
| `124:30762` | Mobile / Produto / cabo4 | 430 × 932 |
| `124:30919` | Mobile / Produto / cabopp | 430 × 932 |
| `124:31076` | Mobile / Produto / paralelo | 430 × 932 |
| `124:31233` | Mobile / Produto / tomada10 | 430 × 932 |
| `124:31390` | Mobile / Produto / tomada20 | 430 × 932 |
| `124:31547` | Mobile / Produto / simples | 430 × 932 |
| `124:31704` | Mobile / Produto / duplo | 430 × 932 |
| `124:31861` | Mobile / Produto / conjunto | 430 × 932 |
| `124:32018` | Mobile / Produto / lampada | 430 × 932 |
| `124:32175` | Mobile / Produto / painel | 430 × 932 |
| `124:32332` | Mobile / Produto / spot | 430 × 932 |
| `124:32489` | Mobile / Produto / refletor | 430 × 932 |
| `124:32646` | Mobile / Produto / luminaria | 430 × 932 |
| `124:32803` | Mobile / Produto / mono | 430 × 932 |
| `124:32960` | Mobile / Produto / bipolar | 430 × 932 |
| `124:33117` | Mobile / Produto / quadro | 430 × 932 |
| `124:33274` | Mobile / Produto / dr | 430 × 932 |
| `124:33431` | Mobile / Produto / dps | 430 × 932 |
| `124:33588` | Mobile / Produto / alicate | 430 × 932 |
| `124:33745` | Mobile / Produto / chave | 430 × 932 |
| `124:33902` | Mobile / Produto / multimetro | 430 × 932 |
| `124:34059` | Mobile / Produto / fita | 430 × 932 |
| `124:34216` | Mobile / Produto / caixa | 430 × 932 |
| `124:34373` | Mobile / Produto / conector | 430 × 932 |
| `124:34530` | Mobile / Meus pedidos | 430 × 932 |
| `124:34758` | Mobile / Pedido / Pedido realizado | 430 × 932 |
| `124:35012` | Mobile / Pedido / Pagamento confirmado | 430 × 932 |
| `124:35266` | Mobile / Pedido / Preparando pedido | 430 × 932 |
| `124:35520` | Mobile / Pedido / Pedido enviado | 430 × 932 |
| `124:35774` | Mobile / Pedido / Saiu para entrega | 430 × 932 |
| `124:36028` | Mobile / Pedido / Entregue | 430 × 932 |
| `124:36282` | Mobile / Pedido / Pedido cancelado | 430 × 932 |
| `124:36536` | Mobile / Pedido / Aguardando pagamento | 430 × 932 |

### Desktop — Entradas em modo escuro

| ID | Nome | Dimensão |
| --- | --- | --- |
| `133:34231` | Desktop — Escuro / Home | 1440 × 2069 |
| `133:34645` | Desktop — Escuro / Produto | 1440 × 2016 |
| `133:34985` | Desktop — Escuro / Carrinho | 1440 × 1269 |

### Mobile — Entradas em modo escuro

| ID | Nome | Dimensão |
| --- | --- | --- |
| `133:35711` | Mobile — Escuro / Home | 430 × 932 |
| `133:35923` | Mobile — Escuro / Produto | 430 × 932 |
| `133:36102` | Mobile — Escuro / Carrinho | 430 × 932 |

### Mobile / iPhone 15 Pro Max / componentes

| ID | Nome | Dimensão |
| --- | --- | --- |
| `147:35028` | Libardi / Mobile 430 / Status | 430 × 59 |
| `147:35046` | Libardi / Mobile 430 / Cabeçalho | 430 × 60 |
| `147:35074` | Libardi / Mobile 430 / Navegação inferior | 430 × 83 |
| `147:35088` | Libardi / Mobile 430 / Card de produto | 189 × 348 |
| `196:28867` | Libardi / Alternar tema / compacto | 44 × 44 |

### Desktop — Páginas auxiliares / Claro e Escuro

| ID | Nome | Dimensão |
| --- | --- | --- |
| `30:1154` | Solicitação de orçamento | 1440 × 1194 |
| `30:1431` | Orçamento solicitado | 1440 × 1192 |
| `51:2400` | Central de ajuda | 1440 × 1582 |
| `65:5925` | Erro 404 | 1440 × 1119 |
| `65:6097` | Sobre nós | 1440 × 1627 |
| `66:6555` | Trocas e devoluções | 1440 × 1665 |
| `66:6755` | Política de privacidade | 1440 × 1705 |
| `66:6964` | Termos de uso | 1440 × 1711 |
