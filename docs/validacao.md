# Relatório de testes — revisão de 27/10/2026

Este documento substitui o relatório anterior. Os resultados abaixo foram executados nesta revisão; publicação e avaliação do professor continuam pendentes. A auditoria anterior às alterações está em `auditoria-inicial.md`.

## Compilação e testes de regras

- Execução inicial: `npm test`, **14/14 aprovados**; `npm run build`, aprovado.
- Após as correções: `npm test`, **23/23 aprovados** em três arquivos; `npm run build`, aprovado com TypeScript e Vite.
- `git diff --check`: aprovado antes do commit das correções.
- A aplicação foi executada na prévia local e testada no Chrome disponível nesta sessão.

| Arquivo | Testes | Cobertura executada |
| --- | ---: | --- |
| `catalog.test.ts` | 13 | Adicionar, aumentar, remover até vazio; totais com múltiplos itens; rejeição de quantidades inválidas; limite 99; serialização/recuperação; carrinho corrompido; moeda; 26 IDs únicos; busca; filtros; ordenação; nenhum resultado |
| `payment.test.ts` | 7 | Débito à vista; Pix 5%; arredondamento de meio centavo; parcelas exatas; normalização; subtotais inválidos; combinações de totais e 1–10 parcelas |
| `checkout.test.ts` | 3 | Entrega/retirada; nome, e-mail e telefone; CEP, campos só com espaços, UF e modalidade inválida |

## Fluxos executados no navegador

| ID | Ação | Resultado observado |
| --- | --- | --- |
| B01 | Adicionar cabo de R$ 189,90 e tomada de R$ 9,90 | Dois itens, subtotal/total R$ 199,80 |
| B02 | Aumentar cabo para 2 | Total atualizado imediatamente para R$ 389,70 |
| B03 | Recarregar e diminuir cabo | R$ 389,70 preservado na recarga; retorno a R$ 199,80 ao diminuir |
| B04 | Remover tomada e depois cabo | R$ 189,90 após primeira remoção; carrinho vazio após segunda |
| B05 | Checkout vazio e campos obrigatórios | Não conclui sem produtos; navegador indica campos obrigatórios e pagamento |
| B06 | Telefone `123`; depois rua só com espaços | Mensagens de erro específicas; revisão bloqueada |
| B07 | Preencher endereço fictício válido | Revisão mostra nome, contato, rua, número, bairro, cidade, UF e CEP corretos |
| B08 | Concluir débito com dois produtos | Referência DEMO-MVRGJHFE; R$ 199,80; produtos e débito visíveis na confirmação |
| B09 | Recarregar confirmação de débito | Referência e resumo preservados; carrinho esvaziado |
| B10 | Crédito com retirada e 7 parcelas | Duas parcelas de R$ 28,55 + cinco de R$ 28,54; total R$ 199,80; referência DEMO-MVRGKAVS |
| B11 | Pix com dois produtos | Desconto R$ 9,99, total R$ 189,81; referência DEMO-MVRGKLU4; nenhum QR Code ou cobrança |
| B12 | Abrir histórico e recarregar | Três demonstrações continuaram presentes |
| B13 | Favoritar lâmpada, abrir favoritos, recarregar e remover | Um item persistente; depois estado vazio correto |
| B14 | Buscar `LAMPADA` | Uma lâmpada encontrada, independentemente do acento |
| B15 | Tramontina + máximo R$ 20 + maior preço | Interruptor R$ 19,90 seguido de tomada R$ 14,90; limpar restaura 26 produtos |
| B16 | Abrir filtros mobile, tipo Iluminação e fechar | Cinco produtos; painel fecha no botão Ver 5 produtos |
| B17 | Comprar e favoritar pelo mobile; usar Categorias na navegação inferior | Item adicionado; favorito marcado; página Explore a Libardi aberta |
| B18 | Orçamento com CEP inválido e depois válido | Rejeita CEP incorreto; valida e informa que não enviou/agendou nada |
| B19 | Cadastro com senhas diferentes e depois iguais | Rejeita diferença; valida e informa que nenhuma conta foi criada |
| B20 | Alternar tema diretamente na aplicação e recarregar | Claro e escuro disponíveis; claro persistiu na recarga, assim como escuro já verificado |
| B21 | Abrir 26 detalhes de produto em 430 px | Títulos correspondentes, todas as 26 imagens principais carregadas, sem excesso horizontal |
| B22 | Abrir páginas auxiliares, categorias e rota inexistente | Títulos corretos e 404 visual adequado; sem excesso horizontal em 430 px |
| B23 | Checkout completo mobile em 430 px, com lâmpada e Pix | Referência DEMO-MVRH50MT; subtotal R$ 6,90; desconto R$ 0,34; total R$ 6,56; confirmação preenchida sem excesso horizontal |
| B24 | Controle de tema mobile acionado por Enter | Botão alternou para Ativar modo claro; documento medido como dark em 430 px |
| B25 | Busca da Home mobile após alinhamento visual ao Figma | Ícone à esquerda, campo Buscar produtos e alvo de 44 px; pesquisar LAMPADA por Enter retornou a lâmpada |

A primeira sequência rápida de controles de filtro não gerou o resultado esperado. O teste foi repetido com inspeção após cada atualização e passou com a URL `?marca=Tramontina&max=20&ordem=maior-preco`. Algumas tentativas de clicar no cabeçalho dentro dos iframes não navegaram/alternaram como esperado no navegador automatizado; a navegação por teclado no quadro mobile e a verificação direta na aplicação confirmaram os fluxos. Não foi declarado sucesso a partir das tentativas inconclusivas. Recomenda-se conferir toque e clique também no aparelho físico.

## Responsividade e comparação visual

O auxiliar `qa/index.html` disponibiliza 320, 390, 430, 768 e 1440 px e mede o documento de cada iframe. O Chrome usado reserva 15 px para a barra de rolagem, portanto as áreas de conteúdo medidas foram 305, 375, 415, 753 e 1425 px. O excesso horizontal é `scrollWidth - clientWidth`; zero indica que o documento cabe na área disponível.

| Conjunto confirmado | Larguras | Tema | Resultado |
| --- | --- | --- | --- |
| Home, catálogo, explorar, pesquisa, favoritos, carrinho, checkout, confirmação sem referência, perfil, login e cadastro | Cinco larguras | Escuro | 55 medições sem excesso horizontal |
| Carrinho, checkout, favoritos e histórico com dados de demonstração | Cinco larguras | Escuro | 20 medições sem excesso horizontal |
| Home, carrinho, checkout, favoritos, pedidos, serviços, orçamento e ajuda | Cinco larguras | Claro | 40 medições, todas identificadas como light, sem excesso horizontal |
| Todos os 26 detalhes | 430 px | Escuro | 26 imagens principais carregadas e nenhum excesso horizontal |
| Pedidos, acompanhamento, serviços, orçamento/confirmação, ajuda, sobre, trocas, privacidade, termos, entregas, trabalhe conosco, 404 e cinco categorias | 430 px | Claro | 18 rotas carregadas sem excesso horizontal |

A Home desktop foi comparada visualmente às referências atuais do Figma, com preservação do logotipo, banner, cores, fontes e composição. A Home mobile foi inspecionada visualmente na referência 430 px. Os cards receberam categoria e descrição compactas para atender ao requisito explícito da rubrica; isso aumenta sua altura em relação ao protótipo anterior. Checkout e confirmação foram completados com componentes da mesma identidade. O auxiliar local de teste pode ter rolagem horizontal intencional para comparar cinco telas lado a lado; esse auxiliar não faz parte do build publicado.

## Limitações e pendências

- **GitHub:** conta conectada identificada como berenalso; consulta `berenalso/libardi-instalacoes` retornou 404, que pode significar inexistência ou falta de acesso. A integração não oferece criação de repositório; a interface web abriu o login. Nenhum envio foi confirmado nesta revisão.
- **Vercel:** integração localizada, mas ainda não instalada/conectada. Nenhum deploy ou teste de domínio final foi realizado.
- Não há garantia de 14/14: a nota e o domínio técnico dependem da avaliação e apresentação do aluno.
- Comparação visual representativa, sem certificação pixel a pixel de todas as variações. Nenhum teste em iPhone físico, Safari, leitor de tela ou auditoria WCAG completa foi realizado.
- 25 produtos têm fotos; o DPS tem ilustração genérica explicitamente identificada. Fixadores e Eletrodutos são entradas do Figma sem produtos no catálogo de 26 itens.
- Conta, pagamentos, pedidos, acompanhamento, frete, estoque e envio de formulários são demonstrações. Os formulários não enviam dados; não houve transação real.
- Fotos adicionadas de terceiros têm procedência documentada em `product-photo-sources.json`; autorização de reutilização comercial não foi comprovada. Não ativar operação comercial sem regularizar os ativos e integrações.

## Testes necessários após publicar

Abrir o endereço retornado pela Vercel; testar Home, `/produto/cabo25`, `/catalogo`, `/carrinho`, `/checkout` e uma rota inexistente; recarregar URLs internas; repetir carrinho, favoritos, temas e os três métodos simulados. Registrar o commit publicado e a URL real. Até lá, esses testes continuam **não executados**.
