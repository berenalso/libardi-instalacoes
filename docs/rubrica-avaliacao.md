# Conformidade com os 11 critérios — total oficial de 14 pontos

Os valores são os pesos da rubrica, **não notas garantidas**. A auditoria antes da conversão está em `auditoria-inicial.md`. Os testes e seus limites estão em `validacao.md`.

| Critério | Máximo | Situação atual | Problema encontrado | Correção realizada / pendência | Evidência |
|---|---:|---|---|---|---|
| 1. Estrutura e organização | 1,0 | Implementado em arquivos simples | Fonte dividida em TSX/TS/configurações | 25 HTMLs, uma folha CSS, 10 scripts da loja; assets e docs separados | Inspeção de referências locais e sintaxe aprovada |
| 2. Identidade visual e design | 1,5 | Preservada; sem certificação pixel a pixel | Dependências de fontes e ícones; risco de alterar visual na conversão | CSS, logo, banner e tokens reaproveitados; fontes locais; SVGs estáticos | Home desktop/mobile e checkout escuro inspecionados; Figma Home mobile consultado |
| 3. Página inicial e produtos | 1,5 | 26 produtos preservados | Array tipado dependente do app | Dados em JS; cards com imagem, nome, reais, descrição, categoria e detalhe | 26 IDs únicos; todos os detalhes/imagens carregaram. DPS ilustrativo identificado |
| 4. Navegação e usabilidade | 1,0 | Navegação HTML local funcionando | Rotas dependiam do React Router | Links `.html`; filtros, busca, perfil, serviços e histórico convertidos; rewrites antigos configurados | 50 telas por largura; busca, filtros, favoritos, carrinho e formulários exercitados. Rewrites publicados ainda pendentes |
| 5. Carrinho | 2,0 | Implementado e testado | Estado ligado ao React | Objeto de quantidades, DOM e LocalStorage; limites e limpeza de inválidos | Dois produtos, R$ 199,80 → R$ 389,70; reload; remoção/vazio; 37 testes incluem cálculos/limites |
| 6. Checkout | 1,0 | Implementado e testado | Formulário dependia de componente/hooks | Formulário HTML com validação, resumo, entrega/retirada, revisão e conclusão | Vazios e endereço inválido rejeitados; conclusão desktop e mobile |
| 7. Pagamentos | 1,5 | Débito, crédito, parcelas e Pix funcionais como simulação | Regras precisavam sobreviver à remoção do TS | Funções JS em centavos; 1–10 parcelas; desconto Pix; confirmação com método/total | Três métodos concluídos; crédito de 7 parcelas soma R$ 199,80; Pix R$ 189,81 |
| 8. HTML, CSS e JavaScript | 1,0 | Adequado à instrução atual | Tecnologias não estudadas eram necessárias para executar | Removidos React, TypeScript, Vite, Tailwind, Router e Vitest; HTML/CSS/JS puro | Nenhum manifesto de pacotes, TS/TSX ou import de framework; eventos/DOM/validação visíveis |
| 9. Git e GitHub | 1,0 | Branch publicada; PR para revisão | Não substituir a principal | `versao-html-css-js`, commits reais, README e PR; sem merge | Links da branch/PR entregues; comparar com `main` |
| 10. Responsividade | 1,0 | Verificada localmente | Conversão podia regredir menu/filtros/formulários | CSS responsivo e navegação inferior preservados | 250 carregamentos em 5 larguras sem overflow/imagem quebrada; fluxo mobile interativo. Sem aparelho físico |
| 11. Apresentação e domínio técnico | 1,5 | Material pronto; domínio depende da apresentação | Guia antigo ensinava ferramentas removidas | Guia reescrito com DOM, eventos, arrays, centavos, LocalStorage, Git e Vercel; roteiro prático | `guia-apresentacao.md` e testes sem biblioteca disponíveis ao aluno |

Publicação: configuração estática pronta; deploy e teste no endereço público dependem da reautenticação exigida pela Vercel. Não apresentar como concluídos antes da verificação real.
