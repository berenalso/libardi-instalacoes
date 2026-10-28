# Auditoria antes da conversão para HTML, CSS e JavaScript

Referência preservada: commit `c08516a` da `main`. A conversão foi iniciada em uma worktree e branch separadas, `versao-html-css-js`, sem apagar ou mesclar a versão principal.

A inspeção encontrou uma aplicação React com TypeScript, Vite, Tailwind, React Router, Lucide e Vitest. O conteúdo estava em `src`, as imagens em `public/assets`, a navegação dependia do roteador e o build gerava `dist`. Isso contrariava a exigência mais recente do professor: páginas HTML, CSS puro e JavaScript puro. Os resultados de testes da versão anterior não comprovam a conversão.

Foram reaproveitados os dados dos 26 produtos, serviços, fotos, logotipo, banner, estilos, textos institucionais, regras de pagamento e chave `libardi:v1`. O Figma foi consultado, incluindo a Home mobile `121:24532`; o inventário anterior das telas permanece em `inventario-figma.md` e `figma-inventory.json`. O histórico complementar não substitui o pedido mais recente.

| Critério | Máximo | Situação encontrada antes da conversão | Problema | Correção planejada | Como verificar |
|---|---:|---|---|---|---|
| 1. Estrutura | 1,0 | Componentes e páginas dentro de `src` | Organização dependente de ferramentas não estudadas | HTMLs na raiz; CSS, JS, imagens e fontes separados | Inspeção de arquivos, links e sintaxe |
| 2. Identidade visual | 1,5 | Tokens, logo e estilos já existentes | Reescrever tudo mudaria o projeto; ícones/fontes dependiam de pacotes | Reaproveitar CSS e assets; fontes locais e SVG estático | Comparar screenshots desktop/mobile e Figma |
| 3. Home e produtos | 1,5 | 26 produtos no arquivo de dados | Dados vinculados a tipos/imports do app | Converter array em JS e preservar todos os campos | Contagem, IDs únicos e 26 detalhes no navegador |
| 4. Navegação | 1,0 | Rotas de aplicação | Não havia documentos HTML separados por página | Criar links `.html` e compatibilidade de URLs antigas na Vercel | Navegação e recarregamento |
| 5. Carrinho | 2,0 | Estado e persistência ligados ao React | Não funcionaria sem o framework | Funções comuns, objeto de quantidades, eventos e DOM | Adicionar, alterar, remover, vazio e recarregar |
| 6. Checkout | 1,0 | Componente com validação/revisão | Necessário preservar o fluxo sem hooks | Formulário HTML e script próprio | Campos vazios, inválidos, revisão e conclusão |
| 7. Pagamentos | 1,5 | Regras de simulação existentes | Não podiam depender de TypeScript | Funções JS em centavos e opções HTML | Débito, crédito, 7 parcelas, Pix e confirmação |
| 8. HTML/CSS/JS | 1,0 | Fonte TSX/TS e ferramentas extras | Incompatível com a instrução escolar atual | Remover pacotes/configurações e implementar JS puro | Ausência de `.ts`, `.tsx`, `package.json`, imports de bibliotecas |
| 9. Git/GitHub | 1,0 | Código publicado na `main` | Risco de substituir a versão atual | Branch solicitada, commits reais e PR sem merge | Histórico e comparação do PR |
| 10. Responsividade | 1,0 | CSS responsivo existente | Conversão poderia regredir filtros, menu e formulários | Reutilizar CSS e testar novas páginas | Matriz de larguras e fluxo mobile interativo |
| 11. Apresentação | 1,5 | Guia explicava React e Vite | Não servia à apresentação das tecnologias ensinadas | Reescrever guia com DOM, eventos, funções e LocalStorage | Guia, exemplos de cálculo e roteiro prático |

O resultado após a implementação está em `rubrica-avaliacao.md` e `validacao.md`. As pontuações acima são os pesos oficiais, não notas atribuídas ao projeto.
