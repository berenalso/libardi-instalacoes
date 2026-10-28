import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, Trash2 } from "lucide-react";
import { Page, Empty, ProductImage, Quantity, Notice } from "../components/UI";
import { cartTotal, productById, money } from "../services/catalog";
import { useStore } from "../hooks/Store";
import { validateCustomer, states, type Customer } from "../services/checkout";
import { OrderSummary } from "../components/OrderSummary";
import {
  PaymentChoices,
  InstallmentDescription,
} from "../components/PaymentChoices";
import {
  calculatePayment,
  paymentNames,
  type PaymentMethod,
} from "../services/payment";
export function CartPage() {
  const store = useStore();
  const entries = Object.entries(store.cart);
  return (
    <Page
      title="Meu carrinho"
      subtitle="Demonstração interativa · preços de exemplo"
    >
      <Link className="button secondary" to="/catalogo">
        Continuar comprando
      </Link>
      {!entries.length ? (
        <Empty title="Seu carrinho está vazio">
          <p>Encontre os materiais para sua próxima instalação.</p>
        </Empty>
      ) : (
        <div className="checkout-grid">
          <div className="cart-list">
            {entries.map(([id, n]) => {
              const p = productById(id)!;
              return (
                <article className="cart-item panel" key={id}>
                  <Link to={"/produto/" + id}>
                    <ProductImage product={p} />
                  </Link>
                  <div className="cart-name">
                    <Link to={"/produto/" + id}>{p.name}</Link>
                    <small>{money(p.priceCents)} por unidade · exemplo</small>
                  </div>
                  <div>
                    <Quantity
                      value={n}
                      onChange={(q) => store.quantity(id, q)}
                      label={"Quantidade de " + p.name}
                    />
                    <button
                      className="remove-button"
                      onClick={() => store.quantity(id, 0)}
                      aria-label={"Remover " + p.name}
                    >
                      <Trash2 size={15} /> Remover
                    </button>
                  </div>
                  <strong>{money(p.priceCents * n)}</strong>
                </article>
              );
            })}
          </div>
          <aside className="panel order-summary">
            <h2>Resumo do pedido</h2>
            <p>Subtotal dos produtos</p>
            <strong className="price">{money(cartTotal(store.cart))}</strong>
            <p className="muted">Frete não calculado nesta demonstração.</p>
            <hr />
            <h3>Total dos produtos</h3>
            <strong className="detail-price">
              {money(cartTotal(store.cart))}
            </strong>
            <Link to="/checkout" className="button primary">
              Prosseguir para o checkout
            </Link>
            <small>Sem cobrança ou reserva de estoque.</small>
          </aside>
        </div>
      )}
    </Page>
  );
}
const blank: Customer = {
  name: "",
  email: "",
  phone: "",
  cep: "",
  street: "",
  number: "",
  district: "",
  city: "",
  state: "RS",
  delivery: "entrega",
};
export function CheckoutPage() {
  const store = useStore();
  const nav = useNavigate();
  const [data, setData] = useState<Customer>(blank);
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const total = cartTotal(store.cart);
  const [method, setMethod] = useState<PaymentMethod | "">("");
  const [installments, setInstallments] = useState(1);
  const payment = method
    ? calculatePayment(total, { method, installments })
    : null;
  function update(k: keyof Customer, v: string) {
    setData((d) => ({ ...d, [k]: v }));
    setReview(false);
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    const validationError = validateCustomer(data);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!method) {
      setError("Escolha uma forma de pagamento demonstrativa.");
      return;
    }
    setError("");
    setReview(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function finish() {
    if (busy || !review || !payment || !Object.keys(store.cart).length) return;
    setBusy(true);
    const id = "DEMO-" + Date.now().toString(36).toUpperCase();
    store.setOrders((o) =>
      [
        {
          id,
          date: new Date().toISOString(),
          items: { ...store.cart },
          totalCents: payment.totalCents,
          payment: {
            method: payment.method,
            installments: payment.installments,
          },
        },
        ...o,
      ].slice(0, 20),
    );
    store.setCart({});
    nav("/checkout/concluido?pedido=" + encodeURIComponent(id), { replace: true, state: { id } });
  }
  if (!Object.keys(store.cart).length)
    return (
      <Page title="Checkout">
        <Empty title="Adicione produtos antes de continuar" />
      </Page>
    );
  return (
    <Page
      title={review ? "Revisar demonstração" : "Finalizar compra"}
      subtitle="Checkout demonstrativo · nenhum pedido ou pagamento real será processado"
    >
      <Link className="button secondary" to="/carrinho">
        Voltar ao carrinho
      </Link>
      <div className="checkout-grid">
        <form id="checkout-form" className="panel form-panel" onSubmit={submit}>
          <Notice>
            Use dados fictícios. Informações pessoais não são enviadas nem
            salvas.
          </Notice>
          {review ? (
            <>
              <h2>Confira os dados</h2>
              <dl className="review-data">
                <dt>Nome</dt>
                <dd>{data.name}</dd>
                <dt>E-mail</dt>
                <dd>{data.email}</dd>
                <dt>Telefone</dt>
                <dd>{data.phone}</dd>
                <dt>Entrega</dt>
                <dd>
                  {data.delivery === "retirada"
                    ? "Retirada demonstrativa"
                    : `${data.street}, ${data.number} — ${data.district}, ${data.city}/${data.state}, CEP ${data.cep}`}
                </dd>
              </dl>
              <button
                className="button outline"
                onClick={() => setReview(false)}
                type="button"
              >
                Editar dados
              </button>
            </>
          ) : (
            <>
              <h2>1. Dados do comprador</h2>
              <label>
                Nome completo
                <input
                  autoComplete="name"
                  required
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Nome e sobrenome"
                  maxLength={100}
                />
              </label>
              <label>
                E-mail
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="nome@exemplo.com"
                  maxLength={200}
                />
              </label>
              <label>
                Telefone
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(51) 99999-9999"
                  maxLength={20}
                />
              </label>
              <h2>2. Entrega</h2>
              <label>
                Modalidade
                <select
                  value={data.delivery}
                  onChange={(e) => update("delivery", e.target.value)}
                >
                  <option value="retirada">Retirada na loja (exemplo)</option>
                  <option value="entrega">Entrega em endereço (exemplo)</option>
                </select>
              </label>
              {data.delivery === "entrega" && (
                <>
                  <label>
                    CEP
                    <input
                      inputMode="numeric"
                      required
                      value={data.cep}
                      onChange={(e) => update("cep", e.target.value)}
                      maxLength={9}
                      placeholder="00000-000"
                    />
                  </label>
                  <label>
                    Rua
                    <input
                      required
                      value={data.street}
                      onChange={(e) => update("street", e.target.value)}
                      maxLength={150}
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Número
                      <input
                        required
                        value={data.number}
                        onChange={(e) => update("number", e.target.value)}
                        maxLength={20}
                      />
                    </label>
                    <label>
                      Bairro
                      <input
                        required
                        value={data.district}
                        onChange={(e) => update("district", e.target.value)}
                        maxLength={80}
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Cidade
                      <input
                        required
                        value={data.city}
                        onChange={(e) => update("city", e.target.value)}
                        maxLength={80}
                      />
                    </label>
                    <label>
                      UF
                      <select
                        value={data.state}
                        onChange={(e) => update("state", e.target.value)}
                      >
                      {states.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                      </select>
                    </label>
                  </div>
                </>
              )}
              <p className="muted">
                Frete, endereço de retirada e prazos dependem de confirmação na
                operação real.
              </p>
            </>
          )}
          <h2>3. Pagamento</h2>
          {review && payment ? (
            <div className="payment-preview">
              <strong>{paymentNames[payment.method]} · simulação</strong>
              <p>
                <InstallmentDescription amounts={payment.amounts} />
              </p>
              <small>Nenhum pagamento será processado ou aprovado.</small>
            </div>
          ) : (
            <PaymentChoices
              method={method}
              installments={installments}
              subtotal={total}
              onMethod={(value) => {
                setMethod(value);
                setInstallments(1);
                setReview(false);
              }}
              onInstallments={(value) => {
                setInstallments(value);
                setReview(false);
              }}
            />
          )}
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
        </form>
        <aside className="panel order-summary">
          <h2>Seus produtos</h2>
          {Object.entries(store.cart).map(([id, n]) => (
            <div className="summary-item" key={id}>
              <strong>{productById(id)!.name}</strong>
              <p>
                {n} × {money(productById(id)!.priceCents)}
              </p>
            </div>
          ))}
          <p>
            Subtotal: <strong>{money(total)}</strong>
          </p>
          {payment && payment.discountCents > 0 && (
            <p>Desconto Pix de exemplo: −{money(payment.discountCents)}</p>
          )}
          <h3>Total da demonstração</h3>
          <strong className="detail-price">
            {money(payment?.totalCents ?? total)}
          </strong>
          {payment && (
            <p className="muted">
              {paymentNames[payment.method]} ·{" "}
              <InstallmentDescription amounts={payment.amounts} />
            </p>
          )}
          {review ? (
            <button
              disabled={busy}
              type="button"
              className="button primary"
              onClick={finish}
            >
              Concluir demonstração
            </button>
          ) : (
            <button
              type="submit"
              form="checkout-form"
              className="button primary"
            >
              Revisar dados
            </button>
          )}
          <small>
            Você não será cobrado. Nenhum pedido será enviado à loja.
          </small>
        </aside>
      </div>
    </Page>
  );
}
export function CheckoutDone() {
  const location = useLocation();
  const { orders } = useStore();
  const id = new URLSearchParams(location.search).get("pedido") || location.state?.id;
  const order = orders.find((item) => item.id === id);
  if (!order) return (
    <Page title="Confirmação demonstrativa">
      <Empty title="Nenhuma demonstração encontrada neste endereço">
        <p>Conclua o checkout ou consulte o histórico salvo neste navegador.</p>
        <Link className="button outline" to="/pedidos">Ver demonstrações salvas</Link>
      </Empty>
    </Page>
  );
  return (
    <Page title="Demonstração concluída">
      <div className="panel success">
        <CheckCircle2 size={52} />
        <h2>Simulação de compra concluída com sucesso</h2>
        <p>
          Nenhum pedido foi processado, nenhum pagamento foi realizado e nenhum
          produto foi reservado.
        </p>
        <OrderSummary order={order} />
        <div className="actions">
          <Link to="/pedidos" className="button primary">
            Ver demonstrações salvas
          </Link>
          <Link to={"/pedidos/" + order.id} className="button outline">Ver detalhes desta demonstração</Link>
          <Link to="/" className="button outline">
            Voltar para a Home
          </Link>
        </div>
      </div>
    </Page>
  );
}
