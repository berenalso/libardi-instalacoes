# Libardi Instalações — HTML, CSS e JavaScript

Trabalho de Criação de Sites da Escola Técnica Estadual Monteiro Lobato (CIMOL). Loja **demonstrativa** de materiais e serviços elétricos, baseada no [Figma original](https://www.figma.com/design/J8MjYIF1QaSxj94qUcMb8s/Libardi-Instala%C3%A7%C3%B5es?node-id=0-1).

A branch `versao-html-css-js` converte o projeto existente para **HTML5, CSS3 e JavaScript puro**. Não utiliza React, TypeScript, Vite, Tailwind, React Router, Vitest, bibliotecas JavaScript, instalação de pacotes ou compilação. A versão anterior permanece no histórico e na `main`; esta branch só deve ser mesclada após aprovação.

## Abrir para estudar

Clone o repositório e selecione a branch:

```bash
git clone https://github.com/berenalso/libardi-instalacoes.git
cd libardi-instalacoes
git switch versao-html-css-js
```

Abra a pasta em seu editor. Sirva a raiz por HTTP. Se Python já estiver instalado, uma opção é:

```bash
python -m http.server 8000
```

Visite `http://localhost:8000/index.html`. Esse servidor é apenas uma opção para estudo local, não uma dependência do site. Os caminhos começam com `/`; abrir um HTML por duplo clique (`file://`) não reproduz a hospedagem HTTP.

## Estrutura

| Arquivo/pasta | Responsabilidade |
|---|---|
| `index.html` | Página inicial, categorias, destaques e serviços |
| `catalogo.html`, `produto.html` | Filtros, ordenação e detalhes (`?id=cabo25`) |
| `carrinho.html` | Quantidades, remoção e totais |
| `checkout.html`, `confirmacao.html` | Validação, pagamentos simulados, revisão e resultado |
| `favoritos.html`, `explorar.html`, `pesquisa.html` | Favoritos, menu de categorias e busca mobile |
| `perfil.html`, `login.html`, `cadastro.html` | Perfil e formulários demonstrativos |
| `pedidos.html`, `pedido.html` | Histórico local e acompanhamento ilustrativo |
| `servicos.html`, `orcamento.html`, `orcamento-concluido.html` | Serviços e solicitação simulada |
| `ajuda.html`, `sobre.html`, `privacidade.html`, `termos.html`, `trocas.html`, `entregas.html`, `trabalhe-conosco.html`, `404.html` | Conteúdo institucional e ajuda |
| `css/estilos.css` | Todos os estilos, temas e regras responsivas |
| `js/dados.js` | Array de 26 produtos, categorias e serviços |
| `js/regras.js` | Funções de cálculo, filtros e validação |
| `js/loja.js` | DOM compartilhado, eventos, tema e LocalStorage |
| `js/catalogo.js`, `js/carrinho.js`, `js/checkout.js` | Comportamento das páginas de compra |
| `js/conta.js`, `js/servicos.js`, `js/informacoes*.js` | Demais páginas |
| `imagens/`, `fontes/` | Imagens, logotipo, ícones SVG estáticos e fontes locais com licenças |
| `testes/` | Verificações sem bibliotecas; excluídas da Vercel |
| `docs/` | Auditoria, conformidade, testes e guia de apresentação |
| `vercel.json` | Hospedagem estática e compatibilidade com URLs anteriores |

## Funcionalidades preservadas

- Catálogo com 26 produtos, preço em reais, imagem, descrição, categoria e especificações.
- Busca sem diferenciar acentos, filtros de categoria, tipo, marca, preço, avaliação e disponibilidade; ordenação.
- Favoritos, carrinho com quantidades de 1 a 99, remoção, atualização imediata e persistência.
- Checkout com dados do cliente, entrega/retirada, validação, revisão e confirmação.
- Débito, crédito de 1 a 10 parcelas sem juros e Pix com desconto demonstrativo de 5%.
- Histórico local dos últimos 20 pedidos simulados, serviços, formulários e temas claro/escuro.
- Layout responsivo com navegação inferior e filtros mobile.

O carrinho, favoritos, tema e pedidos usam a chave `libardi:v1`, preservada da versão anterior **quando ambos são abertos na mesma origem**. Outro domínio/porta tem outro LocalStorage. Endereço, nome, e-mail, telefone e senhas não são persistidos. Não há cobrança, autenticação, estoque, rastreamento, frete calculado nem envio de formulários reais. Pix não gera QR Code ou chave válida. Use dados fictícios.

Os valores ficam em **centavos inteiros**. As parcelas distribuem eventuais centavos restantes entre as primeiras prestações, para a soma corresponder exatamente ao total. Os 26 produtos foram preservados: 25 fotos e uma ilustração genérica de DPS claramente identificada. Fixadores e Eletrodutos continuam com estado vazio porque não havia produtos dessas categorias no catálogo original.

## Testes e apresentação

Abra `/testes/index.html` no servidor local: **37 verificações de regras**, sem Vitest ou outra biblioteca. A página `/testes/responsividade.html` permite inspecionar as páginas em larguras diferentes. Veja os resultados e limites em [docs/validacao.md](docs/validacao.md), a tabela dos 11 critérios em [docs/rubrica-avaliacao.md](docs/rubrica-avaliacao.md) e as explicações com roteiro em [docs/guia-apresentacao.md](docs/guia-apresentacao.md).

## Publicar na Vercel como site estático

1. Importe este repositório e selecione **`versao-html-css-js`** para uma publicação separada ou de prévia. Não mescle na `main` para testar.
2. Framework Preset: **Other**. Root Directory: raiz do repositório.
3. Não configure comandos de instalação ou build. Diretório de saída: **`.`** (raiz).
4. Use o `vercel.json` desta branch: `framework: null`, `buildCommand: null`, `installCommand: null`, `outputDirectory: "."`. Não há variáveis de ambiente.
5. Publique e confira a branch/commit indicado no painel antes de testar. Não aceite a detecção da versão antiga como Vite.
6. Teste Home, catálogo, `/produto.html?id=cabo25`, carrinho, checkout, recarregamento e uma URL anterior como `/produto/cabo25`.

A `.vercelignore` exclui documentação, testes e arquivos de trabalho. As páginas usam URLs `.html`; os redirecionamentos mantêm links antigos conhecidos. Em um servidor HTTP simples, utilize os links `.html`, pois os redirecionamentos são específicos da Vercel. Não há fallback de SPA.

Documentação oficial: [configuração de projeto](https://vercel.com/docs/project-configuration/vercel-json) e [configuração de builds](https://vercel.com/docs/builds/configure-a-build).
