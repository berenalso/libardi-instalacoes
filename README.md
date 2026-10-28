# Libardi Instalações

Aplicação web demonstrativa de materiais elétricos e serviços, baseada no projeto original do Figma. Interface PT-BR, desktop e mobile, temas claro e escuro.

## Executar

Requer Node.js 22.12+ (ou 24 LTS) e npm.

```bash
npm ci
npm run dev
```

```bash
npm test
npm run build
npm run preview
```

O servidor informa a URL local. A compilação é gerada em `dist/`.

## Funcionalidades

- 26 produtos tipados, cinco categorias, páginas de produto, descrição, especificações e relacionados.
- Busca sem diferenciação de acentos, filtros combinados por preço, marca, avaliação, tipo e disponibilidade demonstrativa.
- Cinco ordenações, incluindo menor/maior preço; vendas e novidades usam uma ordem de exemplo.
- Carrinho com adição, remoção e quantidades de 1 a 99; valores calculados em centavos.
- Favoritos, tema e histórico de demonstrações persistidos no LocalStorage.
- Checkout validado com retirada ou endereço de entrega, revisão e conclusão demonstrativa.
- Pagamentos demonstrativos: débito à vista, crédito em 1–10 parcelas e Pix com desconto de exemplo; distribuição exata dos centavos.
- Serviços e formulário de orçamento validado, sem envio real.
- Perfil, login e cadastro demonstrativos, sem armazenamento de senhas.
- Pedidos e explicação de oito estados de acompanhamento, sem confirmação de pagamento.
- Ajuda, FAQ, sobre, privacidade, termos, trocas, entregas e 404.
- Layout mobile com navegação inferior e ação de compra fixa no detalhe do produto.

## Estrutura

- `src/components`: layout e componentes compartilhados.
- `src/pages`: telas e fluxos.
- `src/hooks/Store.tsx`: estado compartilhado e persistência local.
- `src/services/catalog.ts`: busca, filtros, cálculos e validação do carrinho.
- `src/data`: produtos e serviços.
- `src/types`: modelos TypeScript.
- `src/styles.css`: tokens e estilos responsivos; Tailwind integrado pelo Vite.
- `public/assets`: logo e imagens originais do Figma, fotos complementares e ilustração do DPS.
- `docs`: inventário de telas, decisões e relatório de validação.

## Figma

[Arquivo original](https://www.figma.com/design/J8MjYIF1QaSxj94qUcMb8s/Libardi-Instala%C3%A7%C3%B5es?node-id=0-1). A implementação usa a página Site e seus componentes atuais. Nenhuma alteração foi feita no Figma.

Poppins e Inter são hospedadas junto do próprio build. As quatro fotos disponíveis no protótipo foram preservadas; outras 21 foram obtidas de fontes de produtos e otimizadas em WebP. O DPS usa uma ilustração genérica identificada, porque a foto exata estava indisponível. As fontes estão em `docs/product-photo-sources.json`. Preços e avaliações são dados demonstrativos do arquivo.

## Persistência e privacidade

A chave `libardi:v1` salva carrinho, favoritos, tema e referências locais de demonstração. Não há servidor de autenticação, conta real, cobrança, estoque, transporte, e-mail ou atendimento integrado. Dados pessoais digitados nos formulários ficam apenas no estado temporário da página e não são enviados nem persistidos. Use dados fictícios nos testes.

Os dados locais podem ser apagados em Política de privacidade. A aplicação trata JSON inválido, itens desconhecidos e quantidades inválidas. Não há chaves ou variáveis de ambiente necessárias nesta versão.

## Vercel

1. Importe o repositório na conta desejada da Vercel.
2. Framework: Vite; instalação: `npm ci`; build: `npm run build`; diretório: `dist`.
3. Nenhuma variável de ambiente é necessária.
4. `vercel.json` configura retorno à SPA em rotas diretas e cabeçalhos básicos de segurança.
5. Após o deploy, verificar `/produto/cabo25`, `/carrinho`, `/checkout` e uma rota inexistente, inclusive após recarregar.

A publicação deve ocorrer após os testes. O relatório registra o que foi executado localmente e separa verificações de produção ainda pendentes.

## Próximas integrações

Para operar comercialmente: backend de catálogo/estoque, autenticação segura, banco de dados, pedidos, gateway de pagamento, frete, nota fiscal e envio de solicitações. Validar os contatos e condições da empresa, substituir a ilustração do DPS pela foto exata e revisar o conteúdo institucional antes da ativação comercial.

## Preparação para a avaliação

Consulte `docs/rubrica-avaliacao.md` para a conferência dos 11 critérios e `docs/guia-apresentacao.md` para estudar os códigos e praticar a demonstração.

## Auditoria e evidências da revisão

- [Auditoria inicial, antes das alterações](docs/auditoria-inicial.md).
- [Conformidade dos 11 critérios](docs/rubrica-avaliacao.md).
- [Relatório dos testes executados e pendências](docs/validacao.md).
- [Guia de código e roteiro de apresentação](docs/guia-apresentacao.md).

A revisão reforçou a validação de quantidades e endereço, completou a confirmação com número fictício/produtos/método/total e corrigiu anúncios de parcelamento com centavos diferentes. O endereço de entrega aparece por padrão; retirada segue disponível. Há 23 testes de regras em três arquivos. A confirmação pode ser recarregada com sua referência local, sem armazenar dados pessoais.

O auxiliar `/qa/` funciona no servidor de desenvolvimento e compara cinco larguras. Ele não integra a compilação normal. Seu painel mede o documento de cada tela, e as interações continuam sendo verificadas na aplicação.

**Situação da publicação:** Git local atualizado; envio ao GitHub e deploy na Vercel ainda dependem de acesso e não foram confirmados. Nenhum link público final deve ser presumido.

O ZIP de entrega inclui `libardi-history.bundle`, exportado do histórico Git real. Para recuperar esse histórico em outra pasta:

```bash
git clone libardi-history.bundle libardi-com-historico
cd libardi-com-historico
npm ci
npm test
npm run build
```

Isso não publica o código. O envio exige configurar o remote de um repositório autorizado e acessível e executar `git push`. Não há credenciais dentro do pacote.
