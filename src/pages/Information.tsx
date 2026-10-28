import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Users, MapPin } from "lucide-react";
import { Page, Notice } from "../components/UI";
import { SearchForm } from "../components/Layout";
const questions = [
  [
    "Qual o prazo de entrega?",
    "Nesta demonstração, frete e prazo não são calculados. Na operação real, dependerão do CEP, transportadora e estoque.",
  ],
  [
    "Posso retirar o pedido na loja?",
    "O checkout demonstra essa opção. Não há produto reservado ou retirada agendada.",
  ],
  [
    "Como funciona a troca ou devolução?",
    "Consulte a página de trocas e devoluções. Este site não processa compras, devoluções ou reembolsos.",
  ],
  [
    "Quais formas de pagamento são aceitas?",
    "Você pode simular cartão de débito, crédito em até 10 parcelas e Pix. Nenhuma transação é realizada; a cobrança real exige integração futura.",
  ],
  [
    "Vocês emitem nota fiscal?",
    "Esta versão não realiza vendas nem emite documentos fiscais.",
  ],
  [
    "Como peço um orçamento de instalação?",
    "Acesse Serviços e escolha Solicitar orçamento. O formulário atual somente valida os dados localmente.",
  ],
];
export function HelpPage() {
  const [done, setDone] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
    e.currentTarget.reset();
  }
  return (
    <Page
      title="Central de ajuda"
      subtitle="Dúvidas sobre pedidos, entregas, trocas e serviços de instalação"
    >
      <div className="help-links">
        {[
          ["/entregas", "Pedidos e entregas"],
          ["/trocas", "Trocas e devoluções"],
          ["/servicos", "Serviços e orçamentos"],
        ].map(([to, t]) => (
          <Link className="panel" to={to} key={to}>
            <h2>{t}</h2>
            <p>Saiba como funciona →</p>
          </Link>
        ))}
      </div>
      <h2 className="spaced">Perguntas frequentes</h2>
      <div className="faq">
        {questions.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <div className="checkout-grid">
        <section className="panel">
          <h2>Fale com a gente</h2>
          <p>(51) 99971-8787</p>
          <p>R. Gen. Daltro Filho, 88 — Centro, Sapiranga/RS</p>
          <p>Informações de contato do protótipo.</p>
          <a className="button secondary" href="tel:+5551999718787">
            Abrir discador
          </a>
        </section>
        <form className="panel form-panel" onSubmit={submit}>
          <Notice>
            Mensagem demonstrativa, sem envio. Use dados fictícios.
          </Notice>
          <label>
            Nome completo
            <input required minLength={3} maxLength={100} />
          </label>
          <label>
            E-mail
            <input type="email" required />
          </label>
          <label>
            Assunto
            <input required maxLength={100} />
          </label>
          <label>
            Mensagem
            <textarea required minLength={10} maxLength={2000} rows={4} />
          </label>
          <button className="button primary">Validar mensagem</button>
          {done && (
            <p role="status" className="notice">
              Mensagem validada. Nenhuma informação foi enviada.
            </p>
          )}
        </form>
      </div>
    </Page>
  );
}
export function AboutPage() {
  return (
    <Page title="Sobre nós">
      <section className="about-hero panel">
        <h2>Materiais elétricos e instalações com quem entende do assunto</h2>
        <p>
          A Libardi Instalações reúne em um só lugar a venda de materiais
          elétricos e a contratação de serviços de instalação, com atendimento
          próximo.
        </p>
        <Notice>
          Apresentação demonstrativa do projeto Libardi Instalações.
        </Notice>
      </section>
      <h2 className="spaced">Nossos valores</h2>
      <div className="steps">
        {[
          [
            ShieldCheck,
            "Segurança em primeiro lugar",
            "Instalações planejadas conforme avaliação técnica.",
          ],
          [
            Award,
            "Qualidade",
            "Materiais e serviços adequados a cada necessidade.",
          ],
          [
            Users,
            "Atendimento próximo",
            "Orientação na escolha de materiais e serviços.",
          ],
        ].map(([Icon, t, d]) => {
          const C = Icon as typeof Users;
          return (
            <section className="panel" key={String(t)}>
              <C size={32} />
              <h3>{String(t)}</h3>
              <p>{String(d)}</p>
            </section>
          );
        })}
      </div>
      <section className="panel spaced">
        <h2>Onde estamos</h2>
        <MapPin />
        <p>R. Gen. Daltro Filho, 88 — Centro, Sapiranga/RS, CEP 93800-236</p>
        <p>(51) 99971-8787</p>
        <div className="actions">
          <a
            className="button secondary"
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/maps/search/?api=1&query=R.+Gen.+Daltro+Filho+88+Sapiranga+RS"
          >
            Como chegar
          </a>
          <Link className="button outline" to="/ajuda">
            Falar com a Libardi
          </Link>
        </div>
      </section>
    </Page>
  );
}
const articles: Record<
  string,
  { title: string; sections: [string, string][] }
> = {
  privacidade: {
    title: "Política de privacidade",
    sections: [
      [
        "Dados desta demonstração",
        "Carrinho, favoritos, tema e referências de demonstrações são armazenados no LocalStorage deste navegador. Nenhuma senha, endereço, nome ou telefone é persistido pela aplicação.",
      ],
      [
        "Formulários",
        "Os formulários validam dados localmente e não os enviam a um servidor. Use somente dados fictícios.",
      ],
      [
        "Serviços externos",
        "A hospedagem pode registrar dados técnicos de acesso conforme sua própria política. Links externos levam a serviços independentes. Não há analytics ou rastreadores adicionados ao código.",
      ],
      [
        "Limpeza de dados",
        "Você pode apagar os dados locais pelo botão abaixo ou nas configurações do navegador.",
      ],
      [
        "Operação futura",
        "Antes de uma loja real, esta política deverá refletir o backend, fornecedores, responsáveis e tratamento efetivo de dados.",
      ],
    ],
  },
  termos: {
    title: "Termos de uso",
    sections: [
      [
        "Natureza demonstrativa",
        "Este site apresenta o projeto Libardi Instalações. Não constitui uma loja em operação comercial.",
      ],
      [
        "Catálogo",
        "Os preços, descontos, avaliações e disponibilidade são exemplos extraídos do protótipo. Não representam ofertas comerciais ou estoque confirmado.",
      ],
      [
        "Conta e pedidos",
        "Não existe autenticação real. A conclusão do checkout salva apenas uma demonstração local sem dados pessoais.",
      ],
      [
        "Pagamentos e entregas",
        "Não há cobrança, aprovação de pagamento, reserva de estoque, emissão fiscal ou entrega de produtos.",
      ],
      [
        "Serviços",
        "Formulários não enviam solicitações, não geram agendamentos e não garantem retorno. Condições de operação real precisam ser definidas antes de sua ativação.",
      ],
    ],
  },
  trocas: {
    title: "Trocas e devoluções",
    sections: [
      [
        "Versão demonstrativa",
        "Nenhuma compra é realizada neste site, portanto nenhuma troca, devolução ou reembolso pode ser aberto aqui.",
      ],
      [
        "Como será o atendimento",
        "A interface prevê consulta de pedidos e contato com o suporte. O processamento depende de atendimento e backend reais.",
      ],
      [
        "Condições futuras",
        "Prazos, procedimentos e condições de produtos e serviços deverão ser definidos e revisados antes do início da operação comercial.",
      ],
      [
        "Precisa de ajuda?",
        "A Central de ajuda apresenta os canais de contato e um formulário demonstrativo.",
      ],
    ],
  },
  entregas: {
    title: "Prazos de entrega",
    sections: [
      [
        "Entrega e retirada",
        "O checkout demonstra entrega em endereço e retirada. Não há prazo, frete, estoque ou reserva real.",
      ],
      [
        "Consulta futura",
        "O cálculo de frete e o rastreamento dependem de integração com transportadoras e de um backend de pedidos.",
      ],
    ],
  },
  "trabalhe-conosco": {
    title: "Trabalhe conosco",
    sections: [
      [
        "Equipe Libardi",
        "Esta é uma página demonstrativa de contato profissional. Não há vagas confirmadas ou envio de currículos por este site.",
      ],
      [
        "Contato",
        "Consulte a Central de ajuda para conhecer os canais apresentados no protótipo.",
      ],
    ],
  },
};
export function ArticlePage({ kind }: { kind: string }) {
  const article = articles[kind];
  const storeClear = () => {
    localStorage.removeItem("libardi:v1");
    window.location.reload();
  };
  return (
    <Page title={article.title}>
      <div className="article-layout">
        <aside className="panel article-nav">
          {Object.entries(articles).map(([key, a]) => (
            <Link key={key} to={"/" + key}>
              {a.title}
            </Link>
          ))}
          <Link to="/ajuda">Fale conosco</Link>
        </aside>
        <article className="panel article">
          <Notice>
            Informações da versão demonstrativa. Condições comerciais reais
            ainda não estão disponíveis.
          </Notice>
          {article.sections.map(([h, p]) => (
            <section key={h}>
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}
          {kind === "privacidade" && (
            <button
              className="button outline"
              onClick={() => {
                if (
                  window.confirm(
                    "Apagar carrinho, favoritos, tema e demonstrações salvas neste navegador?",
                  )
                )
                  storeClear();
              }}
            >
              Apagar meus dados locais
            </button>
          )}
          <Link className="button secondary" to="/ajuda">
            Central de ajuda
          </Link>
        </article>
      </div>
    </Page>
  );
}
export function NotFound() {
  return (
    <Page title="Página não encontrada">
      <div className="panel empty">
        <strong className="error-code">404</strong>
        <h2>Ops! Essa página saiu do circuito</h2>
        <p>
          O endereço não existe ou foi movido. Busque pelo que precisa ou volte
          para a loja.
        </p>
        <SearchForm />
        <Link className="button primary" to="/">
          Voltar para a Home
        </Link>
        <Link to="/catalogo">Ver produtos</Link>
      </div>
    </Page>
  );
}
