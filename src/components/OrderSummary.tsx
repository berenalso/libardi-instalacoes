import type { DemoOrder } from "../types";
import { cartTotal, money, productById } from "../services/catalog";
import { calculatePayment, normalizePayment, paymentNames } from "../services/payment";
import { InstallmentDescription } from "./PaymentChoices";

export function OrderSummary({ order }: { order: DemoOrder }) {
  const payment = calculatePayment(cartTotal(order.items), normalizePayment(order.payment));
  return (
    <section className="saved-order-summary" aria-label="Resumo da demonstração">
      <h2>Resumo da demonstração</h2>
      <p>Número fictício: <strong>{order.id}</strong></p>
      <ul className="confirmation-items">
        {Object.entries(order.items).map(([id, quantity]) => {
          const product = productById(id)!;
          return (
            <li key={id}>
              <span>{product.name}</span>
              <span>{quantity} × {money(product.priceCents)}</span>
              <strong>{money(quantity * product.priceCents)}</strong>
            </li>
          );
        })}
      </ul>
      <p>Subtotal: {money(payment.subtotalCents)}</p>
      {payment.discountCents > 0 && <p>Desconto Pix de exemplo: −{money(payment.discountCents)}</p>}
      <p>Forma selecionada: <strong>{paymentNames[payment.method]}</strong></p>
      <p><InstallmentDescription amounts={payment.amounts} /></p>
      <p>Total demonstrativo: <strong className="price">{money(order.totalCents)}</strong></p>
      <small>Sem cobrança, aprovação de pagamento ou pedido real.</small>
    </section>
  );
}
