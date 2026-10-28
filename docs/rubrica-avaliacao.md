# Tabela de conformidade — rubrica de 14 pontos

Revisão: 27/10/2026. Esta tabela registra conformidade e evidências, sem atribuir ou garantir nota. O nível EXCELENTE é o objetivo, mas a avaliação pertence ao professor. A situação anterior está em `auditoria-inicial.md`; os testes detalhados e suas limitações estão em `validacao.md`.

| Critério | Máximo | Situação após a revisão | Problema encontrado | Correção aplicada / ação necessária | Evidência dos testes |
| --- | ---: | --- | --- | --- | --- |
| 1. Estrutura e organização | 1,0 | Implementado; versionado localmente | Melhorias anteriores sem commit e QA na raiz | Preservada arquitetura; QA em pasta própria; commits reais por etapa | Build TypeScript/Vite aprovado; `git log`; pastas components/pages/hooks/services/types/data |
| 2. Identidade e design | 1,5 | Implementado e comparado em telas representativas | Necessidade de completar checkout sem alterar identidade; DPS sem foto exata | Cores #1C1F24/#263544/#F5C400, Poppins/Inter e logo preservados; DPS identificado | Figma consultado sem alterações; inspeção visual de Home desktop/mobile e contextos de checkout |
| 3. Home e produtos | 1,5 | 26 produtos preservados | Cards sem descrição/categoria; anúncio de parcelas podia arredondar soma | Metadados compactos e cálculo exato; 25 fotos e uma ilustração genérica | Teste de 26 IDs; B21 com 26 imagens principais carregadas; Home com nome/preço/acesso aos detalhes |
| 4. Navegação e usabilidade | 1,0 | Fluxos principais verificados localmente | Necessidade de confirmar menus, busca, filtros e estados vazios | Rotas preservadas; estados de confirmação sem referência tratados | B04, B13–B17 e B22; 18 rotas auxiliares/categorias em 430 px |
| 5. Carrinho de compras | 2,0 | Prioridade concluída no frontend | Adição negativa era convertida em 1; faltavam testes diretos de operações | Funções puras rejeitam valores inválidos, limitam 99, removem com zero e atualizam estado | 13 testes de catálogo; B01–B04; múltiplos produtos, atualização imediata e recarga |
| 6. Checkout | 1,0 | Implementado; revisão e confirmação completas | Endereço só com espaços; confirmação sem produtos/método/total | Validação dedicada, entrega padrão com todos os campos, retirada opcional, resumo reabrível | Três testes de validação; B05–B09; nenhuma informação financeira solicitada |
| 7. Formas de pagamento | 1,5 | Débito, crédito, parcelamento e Pix simulados | Anúncios dos cards não representavam eventual diferença de centavos | Prévia e confirmação usam a mesma regra; 1–10 parcelas; Pix 5% de exemplo | Sete testes de pagamento; B08/B10/B11; soma de sete parcelas = R$ 199,80 |
| 8. HTML, CSS e JavaScript | 1,0 | Implementado; material didático pronto | Necessidade de explicar uso de React/TypeScript na disciplina | Guia explica HTML/JSX, CSS, JS, eventos, estados, validação e funções reais | Código compilado; formulários e eventos exercitados no navegador |
| 9. Git e GitHub | 1,0 | **Parcial: Git local pronto; publicação pendente** | Sem remote; repo consultado retorna 404; navegador exige login | Commits reais registrados; README atualizado; autenticar e criar/inspecionar repo antes de enviar | Histórico local verificável; nenhuma URL de repositório inventada |
| 10. Responsividade e qualidade | 1,0 | Verificado localmente em desktop/mobile e temas | Necessidade de repetir medidas com os novos cards/checkout | Testes em 320/390/430/768/1440; navegação inferior, filtros e formulários adaptados | Conjuntos de 55, 20 e 40 medições sem excesso horizontal; 26 detalhes em 430 px |
| 11. Apresentação e domínio | 1,5 | Material pronto; depende do estudo do aluno | Guia precisava detalhar eventos, pastas, temas e publicação | Guia ampliado e roteiro de 8–10 minutos com contas verificáveis | `guia-apresentacao.md`; domínio oral/prático ainda deve ser demonstrado pelo aluno |

## Recursos preservados

Favoritos persistentes, busca sem acentos, filtros combinados, ordenação, histórico local, serviços, solicitações demonstrativas, claro/escuro e layout mobile.

## O que é demonstrativo

- Débito, crédito, parcelas e Pix: nenhuma transação, aprovação, QR Code válido ou dados reais de cartão.
- Conclusão do checkout e histórico: apenas referências locais; não representam pedidos processados ou reservas.
- Login/cadastro: validação local, sem conta ou sessão real; senhas não são salvas.
- Solicitações e contato: validação sem envio, protocolo ou agendamento.
- Disponibilidade, avaliações, descontos, frete/retirada e estados de acompanhamento: exemplos de interface.

## Pendências da entrega

1. Autenticar o GitHub, criar ou inspecionar `libardi-instalacoes`, enviar o histórico e conferir acesso do professor.
2. Conectar Vercel, importar o repositório, publicar após os testes e testar o domínio final e suas rotas.
3. Aluno estudar e ensaiar os códigos e a demonstração. Não é possível assegurar domínio técnico por ter um guia pronto.
4. Foto exata do DPS continua indisponível; ilustração genérica está identificada. Fixadores/Eletrodutos não possuem itens no catálogo original.

Para transformar em loja real, ainda seriam necessários backend, autenticação, banco de dados, pedidos, estoque, frete, pagamentos e atendimento integrados. Isso não impede a simulação exigida nesta atividade.
