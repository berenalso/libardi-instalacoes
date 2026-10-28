import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { UserRound, Heart, ReceiptText, ArrowRight } from "lucide-react";
import { useStore } from "../hooks/Store";
import { Page, Notice, Empty } from "../components/UI";
import { money, productById, cartTotal } from "../services/catalog";
import {
  calculatePayment,
  normalizePayment,
  paymentNames,
} from "../services/payment";
import { InstallmentDescription } from "../components/PaymentChoices";
export function ProfilePage() {
  return (
    <Page title="Minha conta" subtitle="Conta demonstrativa">
      <Notice>
        Esta versão não possui autenticação. Seus favoritos e carrinho ficam
        apenas neste navegador.
      </Notice>
      <div className="profile-card panel">
        <UserRound size={46} />
        <h2>Bem-vindo à Libardi</h2>
        <div className="actions">
          <Link to="/login" className="button primary">
            Entrar
          </Link>
          <Link to="/cadastro" className="button outline">
            Criar conta
          </Link>
        </div>
      </div>
      <div className="explore-grid spaced">
        {[
          ["/pedidos", "Meus pedidos", ReceiptText],
          ["/favoritos", "Favoritos", Heart],
          ["/servicos", "Serviços de instalação", UserRound],
        ].map(([to, title, Icon]) => {
          const Component = Icon as typeof UserRound;
          return (
            <Link key={String(to)} className="panel menu-row" to={String(to)}>
              <Component />
              {String(title)}
              <ArrowRight />
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
export function AuthPage({ register = false }: { register?: boolean }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    if (register && d.get("password") !== d.get("confirm")) {
      setError("As senhas não coincidem.");
      return;
    }
    setError("");
    setDone(true);
    f.reset();
  }
  return (
    <Page title={register ? "Criar conta" : "Entrar"}>
      <form className="panel form-panel auth-form" onSubmit={submit}>
        <Notice>
          Formulário demonstrativo. Use dados fictícios. Nenhuma conta ou sessão
          real será criada; senhas não são armazenadas ou enviadas.
        </Notice>
        {register && (
          <label>
            Nome completo
            <input
              name="name"
              required
              minLength={3}
              maxLength={100}
              autoComplete="off"
            />
          </label>
        )}
        <label>
          E-mail
          <input name="email" type="email" required autoComplete="off" />
        </label>
        <label>
          Senha de exemplo
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </label>
        {register && (
          <label>
            Confirmar senha
            <input
              name="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {done && (
          <p className="notice" role="status">
            Formulário validado.{" "}
            {register
              ? "Nenhuma conta foi criada."
              : "Nenhuma autenticação foi realizada."}{" "}
            O backend ainda precisa ser conectado.
          </p>
        )}
        <button className="button primary">
          {register
            ? "Validar cadastro de exemplo"
            : "Validar entrada de exemplo"}
        </button>
        <Link to={register ? "/login" : "/cadastro"}>
          {register ? "Já tem conta? Entrar" : "Criar conta"}
        </Link>
        <Link to="/perfil">Voltar ao perfil</Link>
      </form>
    </Page>
  );
}
export function OrdersPage() {
  const { orders } = useStore();
  return (
    <Page
      title="Meus pedidos"
      subtitle="Histórico local de demonstrações. Não representa compras ou pedidos reais."
    >
      {orders.length ? (
        <div className="order-list">
          {orders.map((o) => (
            <article className="panel" key={o.id}>
              <div className="section-heading">
                <h2>{o.id}</h2>
                <span className="tag">Demonstração local</span>
              </div>
              <p>{new Date(o.date).toLocaleDateString("pt-BR")}</p>
              <p>
                {Object.values(o.items).reduce((a, b) => a + b, 0)} itens ·{" "}
                {money(o.totalCents)}
              </p>
              <Link to={"/pedidos/" + o.id} className="button secondary">
                Ver detalhes
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <Empty title="Nenhuma demonstração salva">
          <p>
            Após testar o checkout, os produtos da demonstração aparecerão aqui.
          </p>
        </Empty>
      )}
      <Link className="button outline spaced" to="/pedidos/exemplo">
        Conhecer o acompanhamento de pedidos
      </Link>
    </Page>
  );
}
const stages = [
  "Pedido realizado",
  "Pagamento confirmado",
  "Preparando pedido",
  "Pedido enviado",
  "Saiu para entrega",
  "Entregue",
  "Pedido cancelado",
  "Aguardando pagamento",
];
export function OrderPage() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);
  const [stage, setStage] = useState("Pedido realizado");
  const payment = order
    ? calculatePayment(cartTotal(order.items), normalizePayment(order.payment))
    : null;
  if (!order && id !== "exemplo")
    return (
      <Page title="Demonstração não encontrada">
        <Link to="/pedidos" className="button primary">
          Meus pedidos
        </Link>
      </Page>
    );
  return (
    <Page
      title="Detalhes do pedido"
      subtitle="Prévia de interface · não existe pedido, pagamento ou rastreamento real."
    >
      <Link className="button secondary" to="/pedidos">
        Voltar a meus pedidos
      </Link>
      <div className="checkout-grid">
        <section className="panel">
          <h2>{order?.id || "Exemplo de acompanhamento"}</h2>
          <Notice>
            As etapas abaixo explicam a interface futura. Selecioná-las não
            confirma pagamentos nem altera pedidos.
          </Notice>
          {order && (
            <>
              <h3>Produtos da demonstração</h3>
              {Object.entries(order.items).map(([pid, n]) => (
                <div className="summary-item" key={pid}>
                  {productById(pid)!.name}
                  <p>
                    {n} × {money(productById(pid)!.priceCents)}
                  </p>
                </div>
              ))}
              <strong className="price">{money(order.totalCents)}</strong>
            </>
          )}
          {payment && (
            <section className="payment-preview">
              <h3>Pagamento demonstrativo</h3>
              <p>
                {paymentNames[payment.method]} ·{" "}
                <InstallmentDescription amounts={payment.amounts} />
              </p>
              {payment.discountCents > 0 && (
                <p>Desconto Pix de exemplo: {money(payment.discountCents)}</p>
              )}
              <small>Nenhuma transação foi realizada.</small>
            </section>
          )}
          <h3 className="spaced">Entrega</h3>
          <p>
            Endereço, frete, transportadora e rastreamento não foram
            processados.
          </p>
          <Link className="button outline" to="/trocas">
            Informações sobre trocas
          </Link>
        </section>
        <section className="panel">
          <h2>Etapas do acompanhamento</h2>
          <label>
            Conhecer um estado da interface
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              {stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <div className="timeline">
            {stages.slice(0, 6).map((s, i) => (
              <div key={s} className={stage === s ? "selected" : ""}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{s}</strong>
                  <small>Estado de referência · sem evento real</small>
                </div>
              </div>
            ))}
          </div>
          {stages.indexOf(stage) > 5 && (
            <Notice>
              {stage}: estado ilustrativo, sem alteração de uma compra.
            </Notice>
          )}
        </section>
      </div>
    </Page>
  );
}
